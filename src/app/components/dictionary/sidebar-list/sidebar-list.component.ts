import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { GenericService } from 'src/app/_services/generic-service';

@Component({
  selector: 'app-sidebar-list',
  templateUrl: './sidebar-list.component.html',
  styleUrls: ['./sidebar-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarListComponent implements OnInit {
  categoryName = '';
  constructor(
    public genericService: GenericService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // if(this.genericService.)
    let length = 0;
    this.genericService.dictionaryCategories$.subscribe(x => {
      length = x.length;
    });
    if (length === 0) {
      this.genericService.getDictionaryCategories();
    }
    const url = this.router.url;
    // if (url.split('/')[1] === 'play') {
    if (url.split('/')[1] === 'dictionary') {
      this.categoryName = 'PSL Dictionary';
    }
    // }
  }

  goToDictionary(categoryId: string) {
    this.router.navigateByUrl(`/dictionary/category/${categoryId}`);
  }
}
