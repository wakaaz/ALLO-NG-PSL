import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DictionaryRoutingModule } from './dictionary-routing.module';
import { DictionaryComponent } from './dictionary.component';
import { ListComponent } from './list/list.component';
import { SidebarListComponent } from './sidebar-list/sidebar-list.component';

import { NgScrollbarModule } from 'ngx-scrollbar';

@NgModule({
  declarations: [
    DictionaryComponent,
    ListComponent,
    SidebarListComponent,
  ],
  imports: [
    CommonModule,
    NgScrollbarModule,
    DictionaryRoutingModule
  ]
})
export class DictionaryModule { }
