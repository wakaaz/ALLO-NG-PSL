import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerRoutingModule } from './player-routing.module';
import { PlayerComponent } from './player.component';
import { PlyrModule } from 'ngx-plyr';
import { FormsModule } from '@angular/forms';

import { NgScrollbarModule } from 'ngx-scrollbar';

@NgModule({
  declarations: [PlayerComponent],
  imports: [
    CommonModule,
    FormsModule,
    PlyrModule,
    NgScrollbarModule,
    PlayerRoutingModule
  ]
})
export class PlayerModule { }
