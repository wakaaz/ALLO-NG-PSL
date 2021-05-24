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
  constructor(
    private route: ActivatedRoute,
    public genericService: GenericService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.genericService.getStoriesVedios(params.id);
      this.genericService.stories$.subscribe(storiesData => {
        this.stories = storiesData;
        this.changeSort('A');
      });
    });
  }
  decodeURIComponent(url: string): string {
    return decodeURIComponent(url);
  }

  changeSort(sort: string) {
    this.stories = this.genericService.sortArray(this.stories, sort);
  }

}
