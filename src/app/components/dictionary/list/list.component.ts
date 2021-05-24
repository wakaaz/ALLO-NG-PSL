import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dictionary } from 'src/app/_models/dictionary';
import { GenericService } from 'src/app/_services/generic-service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
  dictionaries: Array<any>;
  dictionariesList: Array<any>;
  sortBy: string;

  constructor(
    private route: ActivatedRoute,
    public genericService: GenericService
  ) { }
  ngOnDestroy(): void {
    // this.genericService.setEmptyDictionaries();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.genericService.getDictionaries(params.id);
      this.genericService.dictionaries$.subscribe(dictionariesData => {
        this.dictionariesList = [];
        this.dictionaries = dictionariesData;
          // JSON.parse(JSON.stringify()) to break refrence
          this.dictionariesList = JSON.parse(JSON.stringify(this.dictionaries));
          this.sortBy = 'A';
          this.changeSort(this.sortBy);
      })
      // this.initialiseState(); // reset and set based on new parameter this time
    });
  }

  searchWithTitle(keyWord: string): void {
    if (keyWord?.length) {
      this.dictionariesList = this.dictionaries.filter((dictionary: any) => dictionary.english_word.toLowerCase().includes(keyWord.toLowerCase()));
    } else {
      // JSON.parse(JSON.stringify()) to break refrence
      this.dictionariesList = JSON.parse(JSON.stringify(this.dictionaries));
    }
    this.changeSort(this.sortBy);
  }

  changeSort(sort: string) {
    this.sortBy = sort;
    this.dictionariesList = this.genericService.sortSubArray(this.dictionariesList, this.sortBy);
  }

  decodeURIComponent(url: string): string {
    return decodeURIComponent(url);
  }
}
