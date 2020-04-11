import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ContestantModel } from '../models/contestant.model';
import { map } from 'rxjs/operators';
import { EpisodesModel } from '../models/episodes.model';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  contestantsCollection: AngularFirestoreCollection<ContestantModel>;
  contestRequestCollection: AngularFirestoreCollection<ContestantModel>;
  episodesCollection: AngularFirestoreCollection<EpisodesModel>;
  constructor(private afs: AngularFirestore) {
    this.contestantsCollection = afs.collection<ContestantModel>('contestants');
    this.contestRequestCollection = afs.collection<ContestantModel>('contestRequest');
    this.episodesCollection = afs.collection<EpisodesModel>('episodes');
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
    return this.contestRequestCollection.add(contestant);
  }
  /*==update contestants=*/
  updateContestantRequest(contestant: ContestantModel) {
    return this.contestantsCollection.doc(contestant.id).update(contestant);
  }
  /*= Delete contestants ==*/
  deleteContestantRequest(id: string) {
    return this.contestRequestCollection.doc(id).delete();
  }
  /**
   * Episodes
   */
  getEpisodes() {
    return this.episodesCollection.snapshotChanges()
      .pipe(map(actions => actions.map(action => {
        const id = action.payload.doc.id;
        const data = action.payload.doc.data() as EpisodesModel;
        return {id, ...data};
      })))
  }
  getEpisode(id: string) {
    return this.episodesCollection.doc(id).valueChanges();
  }
  addEpisode(episode: EpisodesModel) {
    return this.episodesCollection.add(episode)
  }
  editEpisode(episode: EpisodesModel) {
    return this.episodesCollection.doc(episode.id).update(episode)
  }
  deleteEpisode(id: string) {
    return this.episodesCollection.doc(id).delete();
  }
}
