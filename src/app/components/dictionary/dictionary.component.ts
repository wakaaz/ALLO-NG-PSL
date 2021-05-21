import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Dictionary } from 'src/app/_models/dictionary';
import { GenericService } from 'src/app/_services/generic-service';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: [
    './dictionary.component.css'
  ],
  // encapsulation: ViewEncapsulation.None
})
export class DictionaryComponent implements OnInit {
  dictionaries: Dictionary[];
  categoryName = '';
  constructor(
    public genericService: GenericService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.genericService.getDictionaryCategories();
    this.genericService.dictionaryCategories$.subscribe((dictionriesData: Array<Dictionary>) => {
      this.dictionaries = dictionriesData;
      this.changeSort('A');
    });
    const url = this.router.url;
    // if (url.split('/')[1] === 'play') {
    if (url.split('/')[1] === 'dictionary') {
      this.categoryName = 'PSL Dictionary';
    }
    if (url.split('/')[1] === 'teacherTutorials') {
      this.categoryName = 'Teacher Tutorials';
    }
  }
  decodeURIComponent(url: string): string {
    return decodeURIComponent(url);
  }

  changeSort(sort: string) {
    this.dictionaries = this.genericService.sortArray(this.dictionaries, sort);
  }

}
