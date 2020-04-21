import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map, shareReplay} from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import {User} from 'firebase/app';
import { AuthService } from '../providers/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  appName = environment.appName;
  // responsive side nav
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay(1),
    );
  currentUser: User;

  constructor(private breakpointObserver: BreakpointObserver, private dialog: MatDialog, private auth: AuthService) {
    this.auth.state.subscribe(u => {
      this.currentUser = u;
    });
  }

  ngOnInit() {
  }

  logOut() {
    this.auth.logOut();
  }
}
