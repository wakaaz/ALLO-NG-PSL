import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerRoutingModule } from './player-routing.module';
import { PlayerComponent } from './player.component';
import { PlyrModule } from 'ngx-plyr';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PlayerComponent],
  imports: [
    CommonModule,
    FormsModule,
    PlyrModule,
    PlayerRoutingModule
  ]
})
export class PlayerModule { }
