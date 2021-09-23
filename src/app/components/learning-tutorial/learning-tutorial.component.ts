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
  className: string;
  subjects: Array<any>;

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
    if (this.hasSubjectId) {
      const urlArray = this.path.split('/');
      urlArray.pop();
      const classId = urlArray[urlArray.length - 1];
      this.getSubjects(classId);
    }
  }

  getSubjects(classId: any): void {
    this.genericService.learningTutorial$.subscribe((res: any[]) => {
      if (res !== null) {
        const selectedClass = res.find(x => x.id == classId);
        this.className = selectedClass?.grade;
        this.subjects = selectedClass?.subjects;
        this.sortSubjects();
      }
    });
  }

  sortSubjects() {
    this.subjects = this.genericService.sortMainArray(this.subjects, 'A');
  }

  backToClass(): void {
    const urlArray = this.path.split('/');
    urlArray.pop();
    this.router.navigateByUrl(`${urlArray.join('/')}`);
  }

  goToSubject(url: string): void {
    this.router.navigateByUrl(url);
  }

  goToGrade(categoryId: string) {
    this.router.navigateByUrl(`/learningTutorials/${categoryId}`);
  }

  ngOnDestroy() {
    if (this.storyTypesSubscription$) { this.storyTypesSubscription$.unsubscribe(); }
  }

}
