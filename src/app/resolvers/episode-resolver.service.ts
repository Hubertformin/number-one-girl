import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { EpisodesModel } from '../models/episodes.model';
import { EMPTY, Observable, of } from 'rxjs';
import { DbService } from '../providers/db.service';
import { mergeMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EpisodeResolverService implements Resolve<EpisodesModel> {

  constructor(private db: DbService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<EpisodesModel> | Promise<EpisodesModel> | EpisodesModel {
    return this.db.getEpisode(route.params.id)
      .pipe(
        take(1),
        mergeMap(episode => {
          if (episode) {
            return of(episode);
          } else {
            return EMPTY;
          }
        })
      );
  }
}
