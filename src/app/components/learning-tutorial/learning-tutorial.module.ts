import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearningTutorialRoutingModule } from './learning-tutorial-routing.module';
import { LearningTutorialComponent } from './learning-tutorial.component';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [LearningTutorialComponent, ListComponent],
  imports: [
    CommonModule,
    LearningTutorialRoutingModule
  ]
})
export class LearningTutorialModule { }
