import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeachersTutorialRoutingModule } from './teachers-tutorial-routing.module';
import { TeachersTutorialComponent } from './teachers-tutorial.component';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [TeachersTutorialComponent, ListComponent],
  imports: [
    CommonModule,
    TeachersTutorialRoutingModule
  ]
})
export class TeachersTutorialModule { }
