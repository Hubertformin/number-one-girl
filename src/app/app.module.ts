import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { HomeComponent } from './client/home/home.component';
import { EpisodesComponent } from './client/episodes/episodes.component';
import { AboutComponent } from './client/about/about.component';
import { ClientModule } from './client/client.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RegisterComponent } from './client/register/register.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ContestantsComponent } from './client/contestants/contestants.component';
import localeCMEN from '@angular/common/locales/en-CM';
import localeCMENExtra from '@angular/common/locales/extra/en-CM';
import { registerLocaleData } from '@angular/common';
import { WatchEpisodeComponent } from './client/watch-episode/watch-episode.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { AngularFireFunctionsModule } from '@angular/fire/functions'
import { EpisodeResolverService } from './resolvers/episode-resolver.service';
import { AdminGuard } from './guards/admin.guard';

registerLocaleData(localeCMEN, 'en-CM', localeCMENExtra);

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    // Add .withServerTransition() to support Universal rendering.
    // The application ID can be any identifier which is unique on
    // the page.
    BrowserModule.withServerTransition({ appId: 'my-app' }),
    TransferHttpCacheModule,
    ClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireAuthGuardModule,
    AngularFireFunctionsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'episodes', component: EpisodesComponent },
      { path: 'contestants', component:  ContestantsComponent},
      { path: 'about', component: AboutComponent },
      { path: 'register', component: RegisterComponent },
      {
        path: 'watch/:id',
        component: WatchEpisodeComponent,
        resolve: {
          episode: EpisodeResolverService
        }
      },
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
      },
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
        canActivate: [AdminGuard]
      },
      { path: '**', component: PageNotFoundComponent }
    ]),
    BrowserAnimationsModule,
    MatProgressBarModule
  ],
  bootstrap: [AppComponent],
  providers: [
    {provide: LOCALE_ID, useValue: 'en-CM'}
  ]
})
export class AppModule {}
