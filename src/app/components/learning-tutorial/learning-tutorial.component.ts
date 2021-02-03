import { Component, OnInit } from '@angular/core';
import { GenericService } from 'src/app/_services/generic-service';

@Component({
  selector: 'app-learning-tutorial',
  templateUrl: './learning-tutorial.component.html',
  styleUrls: ['./learning-tutorial.component.css']
})
export class LearningTutorialComponent implements OnInit {

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
