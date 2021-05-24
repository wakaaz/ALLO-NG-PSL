import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeachersTutorialRoutingModule } from './teachers-tutorial-routing.module';
import { TeachersTutorialComponent } from './teachers-tutorial.component';
import { ListComponent } from './list/list.component';
import { VedioListComponent } from './vedio-list/vedio-list.component';


@NgModule({
  declarations: [TeachersTutorialComponent, ListComponent, VedioListComponent],
  imports: [
    CommonModule,
    TeachersTutorialRoutingModule
  ]
})
export class TeachersTutorialModule { }
