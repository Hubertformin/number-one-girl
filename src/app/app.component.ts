import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IsLoadingService } from '@service-work/is-loading';
import { filter } from 'rxjs/operators';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
      <section style="position: fixed;top: 0;left: 0;right: 0;z-index: 999999;">
          <mat-progress-bar *ngIf="isLoading | async" mode="query" color="accent"></mat-progress-bar>
      </section>
      <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  isLoading: Observable<boolean>;
  constructor(
    private isLoadingService: IsLoadingService,
    private router: Router) {}

    ngOnInit(): void {
      this.isLoading = this.isLoadingService.isLoading$();
      this.router.events
        .pipe(
          filter(
            event =>
              event instanceof NavigationStart ||
              event instanceof NavigationEnd ||
              event instanceof NavigationCancel ||
              event instanceof NavigationError,
          ),
        )
        .subscribe(event => {
          // If it's the start of navigation, `add()` a loading indicator
          if (event instanceof NavigationStart) {
            this.isLoadingService.add();
            return;
          }
          // Else navigation has ended, so `remove()` a loading indicator
          this.isLoadingService.remove();
        });
    }
}
