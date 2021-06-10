import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenericService } from 'src/app/_services/generic-service';

@Component({
  selector: 'app-learning-tutorial',
  templateUrl: './learning-tutorial.component.html',
  styleUrls: ['./learning-tutorial.component.css']
})
export class LearningTutorialComponent implements OnInit {

  constructor(
    private router: Router,
    public genericService: GenericService
  ) { }

  ngOnInit(): void {
    let length = 0;
    this.genericService.storyTypes$.subscribe(x => {
      if (x !== null) {
        length = x.length;
      }
    });
    if (length === 0) {
      this.genericService.getPreferences();
    }
  }

  goToDictionary(categoryId: string) {
    this.router.navigateByUrl(`/learningTutorials/${categoryId}`);
  }

}
