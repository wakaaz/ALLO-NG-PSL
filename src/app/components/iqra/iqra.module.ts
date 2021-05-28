import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IqraRoutingModule } from './iqra-routing.module';
import { IqraComponent } from './iqra.component';

@NgModule({
  declarations: [
    IqraComponent
  ],
  imports: [
    CommonModule,
    IqraRoutingModule
  ]
})
export class IqraModule { }
