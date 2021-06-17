import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { GenericService } from 'src/app/_services/generic-service';

@Component({
  selector: 'app-teachers-tutorial',
  templateUrl: './teachers-tutorial.component.html',
  styleUrls: ['./teachers-tutorial.component.css']
})
export class TeachersTutorialComponent implements OnInit {

  path: string;
  isLoading: boolean;
  hasSubjectId: boolean;

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
    this.genericService.teacherTutorial$.subscribe(x => {
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

  goToDictionary(categoryId: string) {
    this.router.navigateByUrl(`/teacherTutorials/${categoryId}`);
  }
}
