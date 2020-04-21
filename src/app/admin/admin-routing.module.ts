import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewContestantsComponent } from './view-contestants/view-contestants.component';
import { AdminComponent } from './admin.component';
import { AddContestantComponent } from './add-contestant/add-contestant.component';
import { ViewEpisodesComponent } from './view-episodes/view-episodes.component';
import { AddEpisodeComponent } from './add-episode/add-episode.component';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {path: '', redirectTo: 'view-contestants', pathMatch: 'full'},
      {path: 'view-contestants', component: ViewContestantsComponent},
      {path: 'add-contestant', component: AddContestantComponent},
      {path: 'view-episodes', component: ViewEpisodesComponent},
      {path: 'add-episode', component: AddEpisodeComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
