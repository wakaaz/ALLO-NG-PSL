import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Story } from 'src/app/_models/story';
import { GenericService } from 'src/app/_services/generic-service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
  allStories: Array<any> = [];
  stories: Array<Story> = [];
  storiesList: Array<Story> = [];
  sortBy: string;
  isLoading: boolean;
  selectedLanguage: string;

  loaders: Array<number> = [];

  storiesSubscription$: Subscription;

  constructor(
    private route: ActivatedRoute,
    public genericService: GenericService
  ) { }

  ngOnInit(): void {
    this.loaders.length = 12;
    const language = localStorage.getItem('language');
    if (language) {
      this.selectedLanguage = language;
    } else {
      this.selectedLanguage = 'english';
      localStorage.setItem('language', this.selectedLanguage);
    }
    console.log('Language ---> ', this.selectedLanguage);
    this.route.params.subscribe(params => {
      this.isLoading = true;
      this.storiesList = [];
      setTimeout(() => {
        this.storiesSubscription$ = this.genericService.stories$.subscribe(storiesData => {
          if (storiesData !== null) {
            this.allStories = storiesData;
            if (this.selectedLanguage === 'english') {
              this.stories = this.allStories.filter(story => story.language === 'english');
            } else {
              this.stories = this.allStories.filter(story => story.language !== 'english');
            }
            this.isLoading = false;
            // JSON.parse(JSON.stringify()) to break refrence
            this.storiesList = JSON.parse(JSON.stringify(this.stories));
            this.sortBy = 'A';
            this.changeSort(this.sortBy);
          }
        });        
      }, 1000);
      this.genericService.getStoriesVedios(params.id);
    });
  }

  searchWithTitle(keyWord: string): void {
    if (keyWord?.length) {
      this.storiesList = this.stories.filter((subject: Story) => subject.title.toLowerCase().includes(keyWord.toLowerCase()));
    } else {
      // JSON.parse(JSON.stringify()) to break refrence
      this.storiesList = JSON.parse(JSON.stringify(this.stories));
    }
    this.changeSort(this.sortBy);
  }

  decodeURIComponent(url: string): string {
    return decodeURIComponent(url);
  }

  changeSort(sort: string) {
    this.sortBy = sort;
    this.storiesList = this.genericService.sortMainArray(this.storiesList, this.sortBy);
  }

  languageChanged(lang: string): void {
    this.selectedLanguage = lang;
    localStorage.setItem('language', this.selectedLanguage);
    if (this.selectedLanguage === 'english') {
      this.stories = this.allStories.filter(story => story.language === 'english');
    } else {
      this.stories = this.allStories.filter(story => story.language !== 'english');
    }
    // JSON.parse(JSON.stringify()) to break refrence
    this.storiesList = JSON.parse(JSON.stringify(this.stories));
    this.changeSort(this.sortBy);
  }

  ngOnDestroy() {
    if (this.storiesSubscription$) { this.storiesSubscription$.unsubscribe(); }
  }
}
