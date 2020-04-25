import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContestantModel } from '../../models/contestant.model';
import { DbService } from '../../providers/db.service';
import { SeoService } from '../../providers/seo.service';
import { EMPTY, Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { ToastService } from '../../providers/toast.service';
import { IsLoadingService } from '@service-work/is-loading';

@Component({
  selector: 'app-add-contestant',
  templateUrl: './add-contestant.component.html',
  styleUrls: ['./add-contestant.component.scss']
})
export class AddContestantComponent implements OnInit {
  imageUrl: any;
  form: FormGroup;
  contestant: ContestantModel;
  uploadPercent: Observable<number>;
  private isUploadingImage: boolean;

  constructor(private sanitizer: DomSanitizer,
              private db: DbService,
              private storage: AngularFireStorage,
              private seoService: SeoService,
              private toast: ToastService,
              private isLoading: IsLoadingService,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      photoUrl: [''],
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      age: ['', Validators.min(1)],
      email: ['', [Validators.email]],
      voteCount: 0
    })
  }

  ngOnInit(): void {
    this.seoService.setAdminTitle('Add contestant');
  }
  /*
  * */
  onImageSelected(event) {
    this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(event.target.files[0]));
    // upload image
    this.uploadFile(event.target.files[0]);
  }
  /*
  * upload image
  * */
  uploadFile(file) {
    const filePath = makeId(15);
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    // set image upload status to start...
    this.isUploadingImage = true;
    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => {
        // listen for the image download url
        fileRef.getDownloadURL()
          .subscribe(photoUrl => {
            this.isUploadingImage = false;
            this.form.patchValue({photoUrl});
          });
      })
    ).subscribe();
    // listen for error
    task.catch(err => {
      this.imageUrl = null;
      this.toast.notify(err.message);
    });
  }
  /*
  * Submit form
  * */
  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (!this.imageUrl) {
      this.toast.notify('Please import the contestants photo');
      return;
    }
    // if image is still uploading while
    if (this.isUploadingImage) {
      this.toast.notify('Please wait for the image upload to finish');
      return;
    }
    // submit form, first show loader
    this.isLoading.add();
    this.db.addContestantRequest(this.form.value)
      .then(() => {
        this.toast.notify('Successfully added contestant');
        // reset values
        this.form.reset();
        this.imageUrl = null;
        this.uploadPercent = EMPTY;
      })
      .catch((err) => {
        this.toast.notify(err.message);
      })
      .finally(() => {
        this.isLoading.remove();
      });
  }
}

function makeId(length) {
  let result           = '';
  const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
