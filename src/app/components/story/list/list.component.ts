import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Story } from 'src/app/_models/story';
import { GenericService } from 'src/app/_services/generic-service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  stories: Array<Story> = [];
  storiesList: Array<Story> = [];
  sortBy: string;
  isLoading: boolean;
  loaders: Array<number> = [];

  constructor(
    private route: ActivatedRoute,
    public genericService: GenericService
  ) { }

  ngOnInit(): void {
    this.loaders.length = 12;
    this.route.params.subscribe(params => {
      this.isLoading = true;
      this.storiesList = [];
      setTimeout(() => {
        this.genericService.stories$.subscribe(storiesData => {
          if (storiesData !== null) {
            this.stories = storiesData;
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

}
