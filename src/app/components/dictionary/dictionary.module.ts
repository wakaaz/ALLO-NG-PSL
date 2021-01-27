import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DictionaryRoutingModule } from './dictionary-routing.module';
import { DictionaryComponent } from './dictionary.component';
import { ListComponent } from './list/list.component';
import { SidebarListComponent } from './sidebar-list/sidebar-list.component';


@NgModule({
  declarations: [
    DictionaryComponent,
    ListComponent,
    SidebarListComponent
  ],
  imports: [
    CommonModule,
    DictionaryRoutingModule
  ]
})
export class DictionaryModule { }
