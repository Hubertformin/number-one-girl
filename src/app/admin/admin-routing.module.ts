import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewContestantsComponent } from './view-contestants/view-contestants.component';
import { AdminComponent } from './admin.component';
import { AddContestantComponent } from './add-contestant/add-contestant.component';
import { ViewEpisodesComponent } from './view-episodes/view-episodes.component';
import { AddEpisodeComponent } from './add-episode/add-episode.component';
import { ContestantsRequestComponent } from './contestants-request/contestants-request.component';
import { SettingsComponent } from './settings/settings.component';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {path: '', redirectTo: 'contestants/view', pathMatch: 'full'},
      {
        path: 'contestants',
        children: [
          {path: '', redirectTo: 'view', pathMatch: 'full'},
          {path: 'add', component: AddContestantComponent},
          {path: 'view', component: ViewContestantsComponent},
          {path: 'request', component: ContestantsRequestComponent}
        ]
      },
      {
        path: 'episodes',
        children: [
          {path: '', redirectTo: 'view', pathMatch: 'full'},
          {path: 'add', component: AddEpisodeComponent},
          {path: 'view', component: ViewEpisodesComponent}
        ]
      },
      {
        path: 'settings',
        component: SettingsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
