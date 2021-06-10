import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-video',
  template: `
      <vg-player>
        <video [vgMedia]="media" #media id="singleVideo" preload="auto" controls>
            <source [src]="url" type="video/mp4">
        </video>
    </vg-player>
`,
  styles: [`h1 { font-family: Lato; }`]
})
export class VideogularComponent  {
  @Input() url: string;
}
