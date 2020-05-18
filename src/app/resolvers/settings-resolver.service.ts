import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { DbService } from '../providers/db.service';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { SettingsModel } from '../models/settings.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsResolverService implements Resolve<SettingsModel> {

  constructor(private db: DbService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SettingsModel> | Promise<SettingsModel> | SettingsModel {
    return this.db.getSettings()
      .pipe(
        take(1),
        mergeMap(settings => {
          if (settings) {
            return of(settings);
          } else {
            this.router.navigate(['/no-connection']);
            return EMPTY;
          }
        })
      );
  }
}
