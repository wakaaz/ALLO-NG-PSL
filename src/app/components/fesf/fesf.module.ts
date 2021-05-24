import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FesfRoutingModule } from './fesf-routing.module';
import { FesfComponent } from './fesf.component';


@NgModule({
  declarations: [FesfComponent],
  imports: [
    CommonModule,
    FesfRoutingModule
  ]
})
export class FesfModule { }
