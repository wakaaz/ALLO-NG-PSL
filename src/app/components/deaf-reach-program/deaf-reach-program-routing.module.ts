import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeafReachProgramComponent } from './deaf-reach-program.component';

const routes: Routes = [{ path: '', component: DeafReachProgramComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeafReachProgramRoutingModule { }
