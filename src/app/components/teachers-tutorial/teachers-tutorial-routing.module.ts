import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';

import { TeachersTutorialComponent } from './teachers-tutorial.component';

const routes: Routes = [
  {
    path: '', component: TeachersTutorialComponent,
    children: [
      {
        path: ':id', component: ListComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeachersTutorialRoutingModule { }
