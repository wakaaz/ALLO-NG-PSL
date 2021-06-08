import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GenericService } from './_services/generic-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PSL';
  searchInput: string;
  searchArray: Array<any> = [];

  constructor(private genericService: GenericService, private router: Router) {
    this.genericService.getToken();
  }

  searchWord(keyword: string): void {
    // this.searchArray.length =+1 ; 
    this.searchInput = keyword;
    if (this.searchInput) {
      this.genericService.searchVideos(keyword).subscribe((res: any) => {
        if (res.message === 'Success') {
          this.searchArray = res.data;
        }
      }, error => {
        console.log(`error`, error);
      });
    } else {
      setTimeout(() => {
        this.searchArray = [];
      }, 100);
    }
  }

  resetSearch() {
    this.searchArray.length = 0;
  }

  goToSearch(selectedItem: any): void {
    switch (selectedItem.category) {
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
  }
}
