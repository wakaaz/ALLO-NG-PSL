import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { GenericService } from './_services/generic-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PSL';
  currentRoute: string;
  searchInput: string;
  searchArray: Array<any> = [];
  timer: any;

  constructor(private genericService: GenericService, private router: Router) {
    this.genericService.getToken();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects.split('/')[1];
      }
    })
  }

  searchWord(keyword: string): void {
    // this.searchArray.length =+1 ;
    this.searchInput = keyword;
    if (!this.timer) {
      if (this.searchInput) {
        this.timer = setTimeout(() => {
          this.genericService.searchVideos(keyword)
          .pipe(take(1))
          .subscribe((res: any) => {
            if (res.message === 'Success') {
              this.searchArray = res.data;
            }
            this.resetTimer();
          }, error => {
            console.log(`error`, error);
          });          
        }, 2000);
      } else {
        this.searchArray = [];
      }
    }
  }

  resetTimer() {
    clearTimeout(this.timer);
    this.timer = undefined;
  }

  resetSearch() {
    this.searchArray.length = 0;
  }

  goToSearch(selectedItem: any): void {
    switch (selectedItem.table_name) {
      case 'dictionary':
        this.router.navigateByUrl(`/play/dictionary/category/${selectedItem.category_id}/${selectedItem.id}`);
        break;
      case 'stories':
        this.router.navigateByUrl(`/play/story/${selectedItem.type_id}/${selectedItem.id}`);
        break;
      case 'learningTutorials':
        this.router.navigateByUrl(`/play/learningTutorials/${selectedItem.grade_id}/${selectedItem.subject_id}/${selectedItem.id}`);
        break;
      case 'teacherTutorials':
        this.router.navigateByUrl(`/play/teacherTutorials/${selectedItem.grade_id}/${selectedItem.subject_id}/${selectedItem.id}`);
        break;
      default:
        break;
    }
    (document.getElementById('search-toggle') as HTMLButtonElement).click();
  }
}
