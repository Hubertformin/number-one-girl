import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ViewContestantsComponent } from './view-contestants/view-contestants.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [ViewContestantsComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
