import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LearningTutorialComponent } from './learning-tutorial.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '', component: LearningTutorialComponent,
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
export class LearningTutorialRoutingModule { }
