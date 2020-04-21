import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { ClientRoutingModule } from './client-routing.module';
import { EpisodesComponent } from './episodes/episodes.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContestantsComponent } from './contestants/contestants.component';
import { WatchEpisodeComponent } from './watch-episode/watch-episode.component';
import { VoteContestantComponent } from './vote-contestant/vote-contestant.component';



@NgModule({
  declarations: [HomeComponent,
    EpisodesComponent, AboutComponent,
    RegisterComponent,
    ContestantsComponent,
    WatchEpisodeComponent,
    VoteContestantComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class ClientModule { }
