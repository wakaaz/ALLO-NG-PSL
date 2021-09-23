import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
export class DictionaryComponent implements OnInit, OnDestroy {
  dictionaries: Dictionary[];
  dictionariesList: Array<Dictionary>;
  sortBy: string;
  categoryName = '';
  loaders: Array<number> = [];

  dictionaryCategoriesSubscription$: Subscription;

  constructor(
    public genericService: GenericService,
    private router: Router,
  ) {
    this.loaders.length = 20;
  }

  ngOnInit(): void {
    this.genericService.getDictionaryCategories();
    this.dictionaryCategoriesSubscription$ = this.genericService.dictionaryCategories$.subscribe((dictionriesData: Array<Dictionary>) => {
      if (dictionriesData !== null) {
        this.dictionariesList = [];
        this.dictionaries = dictionriesData;
        // JSON.parse(JSON.stringify(this.dictionaries)) to break refrence
        this.dictionariesList = JSON.parse(JSON.stringify(this.dictionaries));
        this.sortBy = 'A';
        this.changeSort(this.sortBy);
        this.loaders.length = 0;
      }
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

  ngOnDestroy() {
    if (this.dictionaryCategoriesSubscription$) { this.dictionaryCategoriesSubscription$.unsubscribe(); }
  }

}
