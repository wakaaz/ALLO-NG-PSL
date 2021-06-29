import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Dictionary } from 'src/app/_models/dictionary';
import { GenericService } from 'src/app/_services/generic-service';

@Component({
  selector: 'app-sidebar-list',
  templateUrl: './sidebar-list.component.html',
  styleUrls: ['./sidebar-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarListComponent implements OnInit, OnDestroy {
  categoryName = '';
  isLoading: boolean;
  dictionaryId: string;
  selectedDictionaryName: string;
  dictionaryList: Array<Dictionary>;
  dictionaryCategoriesSubscription$: Subscription;
  constructor(
    public genericService: GenericService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const url = this.router.url.split('/');
    // if(this.genericService.)
    let length = 0;
    this.isLoading = true;
    this.dictionaryCategoriesSubscription$ = this.genericService.dictionaryCategories$.subscribe(x => {
      if (x !== null) {
        this.isLoading = false;
        length = x.length;
        this.dictionaryList = x;
        this.dictionaryId = url[url.length -1];
        this.setDictionaryName();
      }
    });
    if (length === 0) {
      this.genericService.getDictionaryCategories();
    }
    if (url[1] === 'dictionary') {
      this.categoryName = 'PSL Dictionary';
    }
  }

  goToDictionary(categoryId: string) {
    this.router.navigateByUrl(`/dictionary/category/${categoryId}`);
    this.dictionaryChanged(categoryId);
  }

  dictionaryChanged(categoryId: string): void {
    this.dictionaryId = categoryId;
    this.setDictionaryName();
  }

  setDictionaryName(): void {
    this.selectedDictionaryName = this.dictionaryList.find(dictionary => dictionary.id === Number(this.dictionaryId))?.title;
  }

  ngOnDestroy() {
    if (this.dictionaryCategoriesSubscription$) { this.dictionaryCategoriesSubscription$.unsubscribe(); }
  }
}
