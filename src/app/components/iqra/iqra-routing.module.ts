import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IqraComponent } from './iqra.component';

const routes: Routes = [
  {
    path: '',
    component: IqraComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IqraRoutingModule { }
