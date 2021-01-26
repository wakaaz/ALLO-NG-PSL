import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DictionaryComponent } from './dictionary.component';
import { ListComponent } from './list/list.component';
import { SidebarListComponent } from './sidebar-list/sidebar-list.component';

const routes: Routes = [
  {
    path: '', component: DictionaryComponent,
  },
  {
    path: ':id', component: SidebarListComponent,
    children: [
      {
        path: ':newId', component: ListComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DictionaryRoutingModule { }
