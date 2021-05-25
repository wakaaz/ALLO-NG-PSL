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
  dictionariesList: Array<Dictionary>;
  sortBy: string;
  categoryName = '';

  constructor(
    public genericService: GenericService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.genericService.getDictionaryCategories();
    this.genericService.dictionaryCategories$.subscribe((dictionriesData: Array<Dictionary>) => {
      this.dictionariesList = [];
      this.dictionaries = dictionriesData;
      // JSON.parse(JSON.stringify(this.dictionaries)) to break refrence
      this.dictionariesList = JSON.parse(JSON.stringify(this.dictionaries));
      this.sortBy = 'A';
      this.changeSort(this.sortBy);
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

  searchWithTitle(keyWord: string): void {
    if (keyWord?.length) {
      this.dictionariesList = this.dictionaries.filter((dictionary: Dictionary) => dictionary.title.toLowerCase().includes(keyWord.toLowerCase()));
    } else {
      // JSON.parse(JSON.stringify()) to break refrence
      this.dictionariesList = JSON.parse(JSON.stringify(this.dictionaries));
    }
    this.changeSort(this.sortBy);
  }

  changeSort(sort: string) {
    this.sortBy = sort;
    this.dictionariesList = this.genericService.sortMainArray(this.dictionariesList, this.sortBy);
  }

}
