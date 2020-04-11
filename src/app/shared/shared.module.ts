import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { MatComponentsModule } from '../mat-components.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PlayerComponent } from './player/player.component';
import { PlyrModule } from './player/plyr/lib/plyr.module';

const modules = [
  MatComponentsModule
];

@NgModule({
  declarations: [ToolbarComponent, FooterComponent, PageNotFoundComponent, PlayerComponent],
  imports: [
    CommonModule,
    ...modules,
    RouterModule,
    PlyrModule
  ],
  exports: [
    ToolbarComponent,
    FooterComponent,
    ...modules,
    PlayerComponent
  ]
})
export class SharedModule { }
