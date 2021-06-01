import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerRoutingModule } from './player-routing.module';
import { PlayerComponent } from './player.component';
import { PlyrModule } from 'ngx-plyr';

@NgModule({
  declarations: [PlayerComponent],
  imports: [
    CommonModule,
    PlyrModule,
    PlayerRoutingModule
  ]
})
export class PlayerModule { }
