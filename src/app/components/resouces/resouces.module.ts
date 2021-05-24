import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResoucesRoutingModule } from './resouces-routing.module';
import { ResoucesComponent } from './resouces.component';


@NgModule({
  declarations: [ResoucesComponent],
  imports: [
    CommonModule,
    ResoucesRoutingModule
  ]
})
export class ResoucesModule { }
