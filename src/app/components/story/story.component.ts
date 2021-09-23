import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GenericService } from 'src/app/_services/generic-service';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit, OnDestroy {

  isLoading: boolean;
  storyTypesSubscription$: Subscription;
  constructor(
    private router: Router,
    public genericService: GenericService
  ) { }

  ngOnInit(): void {
    let length = 0;
    this.isLoading = true;
    this.genericService.storyTypes$.subscribe(x => {
      if (x !== null) {
        this.isLoading = false;
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

  ngOnDestroy() {
    if (this.storyTypesSubscription$) { this.storyTypesSubscription$.unsubscribe(); }
  }

}
