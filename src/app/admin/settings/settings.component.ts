import { Component, OnInit } from '@angular/core';
import { SettingsModel } from '../../models/settings.model';
import { SeoService } from '../../providers/seo.service';
import { DomSanitizer } from '@angular/platform-browser';
import { DbService } from '../../providers/db.service';
import { ToastService } from '../../providers/toast.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settings: SettingsModel;
  uploadPercent: Observable<number>;
  isUploading: boolean;
  displayedImage: any = 'https://firebasestorage.googleapis.com/v0/b/number-one-girl.appspot.com/o/action-04.jpg?alt=media&token=be7f8767-886a-47ec-b93d-fcd09d698db0';

  constructor(private seo: SeoService, private sanitizer: DomSanitizer,
              private toast: ToastService,
              private storage: AngularFireStorage,
              private route: ActivatedRoute,
              private db: DbService) {
    this.seo.setAdminTitle('Settings');
  }

  ngOnInit(): void {
    // get settings data
    this.route.data
      .subscribe((data: {settings: SettingsModel}) => {
        this.settings = data.settings;
      });
  }
  /*
  * Change cover image
  * */
  onImageSelect($event) {
    const file = $event.target.files[0];
    if (file) {
      this.displayedImage = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
      this.uploadFile(file);
    }
  }
  /*
  * upload file
  * */
  uploadFile(file) {
    const fileRef = this.storage.storage.refFromURL(this.settings.pageSettings.home.bannerImageUrl).fullPath;
    const task = this.storage.upload(fileRef, file);
    // show uploading
    this.isUploading  = true;

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    /*task.snapshotChanges().pipe(
      finalize(() => this.downloadURL = fileRef.getDownloadURL() )
    )
      .subscribe()*/
    task.then(() => {
      this.isUploading = false;
    }).catch(err => {
      console.log(err);
      this.isUploading = false;
    })
  }
  /*
  * Save settings
  * */
  saveSettings() {
    console.log(this.settings);
   this.db.setSettings(this.settings)
     .then(() => {
       this.toast.notify('Configuration saved');
     }).catch(err => {
       console.error(err);
       this.toast.notify('Failed to saved settings, Please try again latter!');
   })
  }
}
