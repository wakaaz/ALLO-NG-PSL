import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeachersTutorialRoutingModule } from './teachers-tutorial-routing.module';
import { TeachersTutorialComponent } from './teachers-tutorial.component';
import { ListComponent } from './list/list.component';
import { VedioListComponent } from './vedio-list/vedio-list.component';
import { NgScrollbarModule } from 'ngx-scrollbar';

@NgModule({
  declarations: [TeachersTutorialComponent, ListComponent, VedioListComponent],
  imports: [
    CommonModule,
    NgScrollbarModule,
    TeachersTutorialRoutingModule
  ]
})
export class TeachersTutorialModule { }
