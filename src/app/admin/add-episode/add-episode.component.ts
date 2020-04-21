import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../providers/seo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../providers/toast.service';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { EpisodesModel } from '../../models/episodes.model';
import { DbService } from '../../providers/db.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-add-episode',
  templateUrl: './add-episode.component.html',
  styleUrls: ['./add-episode.component.scss']
})
export class AddEpisodeComponent implements OnInit {

  file: any;
  episodeForm: FormGroup;
  savingEpisode = false;
  uploadPercent: Observable<number>;
  uploadTask: AngularFireUploadTask;

  constructor(private seo: SeoService,
              private fb: FormBuilder,
              private toast: ToastService,
              private db: DbService,
              private storage: AngularFireStorage) {
    this.episodeForm = fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      episodeNumber: ['', [Validators.required, Validators.min(1)]],
      seasonNumber: ['', [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.seo.setAdminTitle('Add episode');
  }

  showModal() {
    $('#saveModal').fadeIn('fast');
  }

  hideModal() {
    $('#saveModal').fadeOut('fast');
  }

  importFile(event) {
    for (const element of event) {
      this.file = element;
    }
  }
  deleteAttachment() {
    this.file = null;
  }
  /*
  * Save form
  * */
  submit() {
    if (this.episodeForm.invalid) {
      this.episodeForm.markAllAsTouched();
      // toast
      this.toast.notify('Please fill the form properly');
      return;
    }
    // if video is not uploader
    if (!this.file) {
      // toast
      this.toast.notify('Please add the video file');
      return;
    }
    // show modal
    this.showModal();
    // upload file
    const filePath = `season-${this.episodeForm.value.seasonNumber}-episode-${this.episodeForm.value.episodeNumber}`;
    const fileRef = this.storage.ref(filePath);
    this.uploadTask = this.storage.upload(filePath, this.file);
    // observe percentage changes
    this.uploadPercent = this.uploadTask.percentageChanges();
    // if upload task failed
    this.uploadTask.catch((err) => {
      this.toast.notify(err.message, 3500);
      this.hideModal();
    });
    // get notified when the download URL is available
    this.uploadTask.snapshotChanges().pipe(
      finalize(() => fileRef.getDownloadURL().subscribe(fileUrl => {
        // save episode to dd
        this.saveEpisode(fileUrl, filePath);
        })
      )
    ).subscribe()
  }
  /*
  * Cancel upload task
  * */
  cancelUpload() {
    if (this.uploadTask) {
      this.uploadTask.cancel();
      this.hideModal();
    }
  }

  private saveEpisode(fileUrl = '', filePath: string) {
    const formValue = this.episodeForm.value;
    const payload: EpisodesModel = {
      title: formValue.title,
      episodeNumber: formValue.episodeNumber,
      seasonNumber: formValue.seasonNumber,
      description: formValue.description,
      viewsCount: 0,
      url: fileUrl,
      createdAt: new Date(),
    };
    // show episode loader
    this.savingEpisode = true;
    // add file to db
    this.db.setEpisode(filePath, payload)
      .then(() => {
        this.toast.notify('Episode successfully added.');
        this.episodeForm.reset();
        this.file = null;
      })
      .catch((err) => {
        this.toast.notify(err.message, 3500);
      })
      .finally(() => {
        // hide modal
        this.hideModal();
        this.savingEpisode = false;
      });
  }
}
