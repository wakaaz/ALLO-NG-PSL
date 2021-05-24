import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResoucesComponent } from './resouces.component';

const routes: Routes = [{ path: '', component: ResoucesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResoucesRoutingModule { }
