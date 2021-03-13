import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeafReachProgramRoutingModule } from './deaf-reach-program-routing.module';
import { DeafReachProgramComponent } from './deaf-reach-program.component';


@NgModule({
  declarations: [DeafReachProgramComponent],
  imports: [
    CommonModule,
    DeafReachProgramRoutingModule
  ]
})
export class DeafReachProgramModule { }
