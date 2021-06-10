import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenericService } from 'src/app/_services/generic-service';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {

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
    this.router.navigateByUrl(`/stories/${categoryId}`);
  }

}
