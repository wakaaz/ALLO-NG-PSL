import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';

import { TeachersTutorialComponent } from './teachers-tutorial.component';
import { VedioListComponent } from './vedio-list/vedio-list.component';

const routes: Routes = [
  {
    path: '', component: TeachersTutorialComponent,
    children: [
      {
        path: ':id', component: ListComponent
      },
      {
        path: ':id/:subjectId', component: VedioListComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeachersTutorialRoutingModule { }
