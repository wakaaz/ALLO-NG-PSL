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
  dictionaries: Array<Dictionary>;

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
        this.dictionaries = dictionariesData;
        this.changeSort('A');
      })
      // this.initialiseState(); // reset and set based on new parameter this time
    });
  }
  
  changeSort(sort: string) {
    this.dictionaries = this.genericService.sortArray(this.dictionaries, sort);
  }

  decodeURIComponent(url: string): string {
    return decodeURIComponent(url);
  }
}
