import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoryRoutingModule } from './story-routing.module';
import { StoryComponent } from './story.component';
import { ListComponent } from './list/list.component';

import { NgScrollbarModule } from 'ngx-scrollbar';

@NgModule({
  declarations: [StoryComponent, ListComponent],
  imports: [
    CommonModule,
    NgScrollbarModule,
    StoryRoutingModule
  ]
})
export class StoryModule { }
