import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GenericService } from 'src/app/_services/generic-service';

@Component({
  selector: 'app-learning-tutorial',
  templateUrl: './learning-tutorial.component.html',
  styleUrls: ['./learning-tutorial.component.css']
})
export class LearningTutorialComponent implements OnInit, OnDestroy {
  isLoading: boolean;
  path: string;
  hasSubjectId: boolean;

  storyTypesSubscription$: Subscription;

  constructor(
    private router: Router,
    public genericService: GenericService
  ) { }

  ngOnInit(): void {
    let length = 0;
    this.isLoading = true;
    this.path = this.router.url;
    this.checkSubjectId();
    this.router.events.subscribe(routerEvent => {
      if (routerEvent instanceof NavigationEnd) {
        this.path = routerEvent.urlAfterRedirects;
        this.checkSubjectId();
      }
    });
    this.storyTypesSubscription$ = this.genericService.storyTypes$.subscribe(x => {
      if (x !== null) {
        this.isLoading = false;
        length = x.length;
      }
    });
    if (length === 0) {
      this.genericService.getPreferences();
    }
  }

  checkSubjectId(): void {
    this.hasSubjectId = this.path.split('/').length === 4;
  }

  backToClass(): void {
    const urlArray = this.path.split('/');
    urlArray.pop();
    this.router.navigateByUrl(`${urlArray.join('/')}`);
  }

  goToGrade(categoryId: string) {
    this.router.navigateByUrl(`/learningTutorials/${categoryId}`);
  }

  ngOnDestroy() {
    if (this.storyTypesSubscription$) { this.storyTypesSubscription$.unsubscribe(); }
  }

}
