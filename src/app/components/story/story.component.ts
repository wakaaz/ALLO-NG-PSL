import { Component, OnInit } from '@angular/core';
import { GenericService } from 'src/app/_services/generic-service';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {

  constructor(
    public genericService: GenericService
  ) { }

  ngOnInit(): void {
    let length = 0;
    this.genericService.storyTypes$.subscribe(x => {
      length = x.length;
    });
    if (length === 0) {
      this.genericService.getPreferences();
    }
  }

}
