import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayerComponent } from './player.component';

const routes: Routes = [
  { path: 'dictionary/category/:id/:vedioId', component: PlayerComponent },
  { path: 'story/:id/:vedioId', component: PlayerComponent },
  { path: 'learningTutorials/:gradeId/:id/:vedioId', component: PlayerComponent },
  { path: 'teacherTutorials/:gradeId/:id/:vedioId', component: PlayerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerRoutingModule { }
