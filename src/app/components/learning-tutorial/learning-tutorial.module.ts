import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearningTutorialRoutingModule } from './learning-tutorial-routing.module';
import { LearningTutorialComponent } from './learning-tutorial.component';
import { ListComponent } from './list/list.component';
import { VideosListComponent } from './videos-list/videos-list.component';
import { SidebarVideoComponent } from './sidebar-video/sidebar-video.component';


@NgModule({
  declarations: [LearningTutorialComponent, ListComponent, VideosListComponent, SidebarVideoComponent],
  imports: [
    CommonModule,
    LearningTutorialRoutingModule
  ]
})
export class LearningTutorialModule { }
