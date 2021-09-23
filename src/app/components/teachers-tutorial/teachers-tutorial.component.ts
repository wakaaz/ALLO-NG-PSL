import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GenericService } from 'src/app/_services/generic-service';

@Component({
  selector: 'app-teachers-tutorial',
  templateUrl: './teachers-tutorial.component.html',
  styleUrls: ['./teachers-tutorial.component.css']
})
export class TeachersTutorialComponent implements OnInit, OnDestroy {

  path: string;
  isLoading: boolean;
  className: string;
  data: Array<any> = [];
  hasSubjectId: boolean;

  teacherTutorialSubscription$: Subscription;

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
    this.teacherTutorialSubscription$ = this.genericService.teacherTutorial$.subscribe(x => {
      if (x !== null) {
        this.data = x;
        const urlArray = this.path.split('/');
        urlArray.pop();
        const classId = urlArray[urlArray.length - 1];
        const selectedClass = this.data.find(subClass => subClass.id == Number(classId));
        this.className = selectedClass?.grade;
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

  goToDictionary(categoryId: string) {
    this.router.navigateByUrl(`/teacherTutorials/${categoryId}`);
  }

  ngOnDestroy() {
    if (this.teacherTutorialSubscription$) { this.teacherTutorialSubscription$.unsubscribe(); }
  }
}
