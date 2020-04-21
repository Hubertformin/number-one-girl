import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { MatComponentsModule } from '../mat-components.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PlayerComponent } from './player/player.component';
import { PlyrModule } from './player/plyr/lib/plyr.module';
import { DragDropDirective } from '../directives/drag-drop.directive';
import { ObjectUrlPipe } from '../pipes/object-url.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCommonModule } from '@angular/material/core';

const modules = [
  MatComponentsModule,
  ReactiveFormsModule,
  FormsModule
];

@NgModule({
  declarations: [ToolbarComponent, FooterComponent, PageNotFoundComponent, PlayerComponent, DragDropDirective, ObjectUrlPipe],
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
    PlayerComponent,
    MatCommonModule,
    DragDropDirective,
    ObjectUrlPipe
  ]
})
export class SharedModule { }
