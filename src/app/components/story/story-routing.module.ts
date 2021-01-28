import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';

import { StoryComponent } from './story.component';

const routes: Routes = [
  {
    path: '', component: StoryComponent,
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
export class StoryRoutingModule { }
