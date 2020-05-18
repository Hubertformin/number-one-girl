import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ContestantModel } from '../models/contestant.model';
import { map } from 'rxjs/operators';
import { EpisodesModel } from '../models/episodes.model';
import { AngularFireStorage } from '@angular/fire/storage';
import { SettingsModel } from '../models/settings.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  contestantsCollection: AngularFirestoreCollection<ContestantModel>;
  episodesCollection: AngularFirestoreCollection<EpisodesModel>;
  private contestantsRequestCollection: AngularFirestoreCollection<ContestantModel>;
  private settingsCollection: AngularFirestoreCollection<SettingsModel>;
  constructor(private afs: AngularFirestore, private afStorage: AngularFireStorage) {
    this.contestantsCollection = afs.collection<ContestantModel>('contestants');
    this.contestantsRequestCollection = afs.collection<ContestantModel>('contestantsRequest');
    this.episodesCollection = afs.collection<EpisodesModel>('episodes');
    this.settingsCollection = afs.collection<SettingsModel>('settings');
  }
  /* get reference*/
  get ref() {
    return this.afs;
  }
  /*==Get==*/
  getContestants() {
    return this.contestantsCollection.snapshotChanges()
      .pipe(map(actions => actions.map(action => {
        const id = action.payload.doc.id;
        const data = action.payload.doc.data() as ContestantModel;
        return {id, ...data};
      })))
  }
  /*=Add contestants=*/
  addContestants(contestant: ContestantModel) {
    return this.contestantsCollection.add(contestant);
  }
  /*==update contestants=*/
  updateContestants(contestant: ContestantModel) {
    return this.contestantsCollection.doc(contestant.id).update(contestant);
  }
  /*= Delete contestants ==*/
  deleteContestants(id: string) {
    return this.contestantsCollection.doc(id).delete();
  }
  /*
  * ======== contestants request
  * */
  /*=Add contestants=*/
  addContestantRequest(contestant: ContestantModel) {
    return this.contestantsRequestCollection.add(contestant);
  }
  getContestantRequest(limit = 20) {
    return this.ref
      .collection<ContestantModel>('contestantsRequest', ref => ref.limit(limit))
      .snapshotChanges()
      .pipe(map(actions => actions.map(action => {
        const id = action.payload.doc.id;
        const data = action.payload.doc.data() as ContestantModel;
        return {id, ...data};
      })))
  }
  /*==update contestants=*/
  updateContestantRequest(contestant: ContestantModel) {
    return this.contestantsRequestCollection.doc(contestant.id).update(contestant);
  }
  /*= Delete contestants ==*/
  deleteContestantRequest(id: string) {
    return this.contestantsRequestCollection.doc(id).delete();
  }
  /**
   * Episodes
   */
  getEpisodes(limit = 15) {
    return this.ref.collection('episodes', ref => ref.orderBy('createdAt', 'desc').limit(limit)).snapshotChanges()
      .pipe(map(actions => actions.map(action => {
        const id = action.payload.doc.id;
        const data = action.payload.doc.data() as EpisodesModel;
        return {id, ...data};
      })))
  }
  getEpisode(episodeId: string) {
    return this.episodesCollection.doc(episodeId).snapshotChanges()
      .pipe(map(action => {
        const id = action.payload.id;
        const data = action.payload.data() as EpisodesModel;
        return {id, ...data};
      }));
  }
  addEpisode(episode: EpisodesModel) {
    return this.episodesCollection.add(episode);
  }
  setEpisode(id: string, episode: EpisodesModel) {
    return this.episodesCollection.doc(id).set(episode);
  }
  editEpisode(episode: EpisodesModel) {
    return this.episodesCollection.doc(episode.id).update(episode)
  }
  deleteEpisode(episode: EpisodesModel) {
    return this.episodesCollection.doc(episode.id).delete()
      .then(() => {
        this.afStorage.storage.refFromURL(episode.url).delete();
      })
  }
  /*
  * Settings
  * */
  getSettings(): Observable<SettingsModel> {
    return this.settingsCollection.doc('SETTINGS')
      .snapshotChanges()
      .pipe(map(action => {
        const id = action.payload.id;
        const data = action.payload.data() as SettingsModel;
        return {id, ...data};
      }))
  }
  setSettings(settings: SettingsModel) {
    return this.settingsCollection.doc('SETTINGS').set(settings);
  }
}
