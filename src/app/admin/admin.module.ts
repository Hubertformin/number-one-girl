import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ViewContestantsComponent } from './view-contestants/view-contestants.component';
import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin.component';
import { AddEpisodeComponent } from './add-episode/add-episode.component';
import { ViewEpisodesComponent } from './view-episodes/view-episodes.component';
import { AddContestantComponent } from './add-contestant/add-contestant.component';
import { ContestantsRequestComponent } from './contestants-request/contestants-request.component';


@NgModule({
  declarations: [
    ViewContestantsComponent,
    AdminComponent,
    AddEpisodeComponent,
    ViewEpisodesComponent,
    AddContestantComponent,
    ContestantsRequestComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
  ]
})
export class AdminModule { }
