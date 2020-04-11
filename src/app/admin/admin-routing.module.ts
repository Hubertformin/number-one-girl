import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewContestantsComponent } from './view-contestants/view-contestants.component';


const routes: Routes = [
  {path: '', redirectTo: 'view-contestants', pathMatch: 'full'},
  {path: 'view-contestants', component: ViewContestantsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
