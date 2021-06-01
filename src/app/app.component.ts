import { Component } from '@angular/core';
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

  constructor(private genericService: GenericService) {
    this.genericService.getToken();
  }

  searchWord(keyword: string): void {
    // this.searchArray.length =+1 ; 
    this.searchInput = keyword;
    this.genericService.searchVideos(keyword).subscribe((res: any) => {
      if (res.message === 'Success') {
        this.searchArray = res.data;
      }
    }, error => {
      console.log(`error`, error);
    });
  }

  resetSearch() {
    this.searchArray.length = 0;
  }
}
