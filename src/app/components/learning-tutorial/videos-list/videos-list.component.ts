import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LearningTutorial, VideoList } from 'src/app/_models/learning-tutorial';
import { GenericService } from 'src/app/_services/generic-service';

@Component({
  selector: 'app-videos-list',
  templateUrl: './videos-list.component.html',
  styleUrls: ['./videos-list.component.css']
})
export class VideosListComponent implements OnInit, OnDestroy {

  tutorialVideos: Array<VideoList> = [];
  tutorialVideosList: VideoList[];
  videoList: any = [];
  loaders: Array<number> = [];
  sortBy: string;
  subjectTitle: string;
  isLoading: boolean;
  subjectId = 0;
  gradeId = 0;
  learningTutorialSubscription$: Subscription;
  learningTutorialVideosSubscription$: Subscription;
  constructor(
    private route: ActivatedRoute,
    public genericService: GenericService
  ) {
    this.route.params.subscribe(params => {
      this.gradeId = params.id;
      this.subjectId = params.subjectId;
      this.loaders.length = 12;
      this.isLoading = true;
      this.tutorialVideosList = [];
      this.learningTutorialSubscription$ = this.genericService.learningTutorial$.subscribe((x: LearningTutorial[]) => {
        if (x !== null) {
          this.subjectTitle = x.find(x => x.id ==this.gradeId)?.subjects.find(subject => subject.id == this.subjectId).title;
        }
      });
      setTimeout(() => {
        genericService.learningTutorialVideos$.subscribe(videos => {
          if (videos !== null) {
            this.tutorialVideos = videos;
            this.tutorialVideosList = JSON.parse(JSON.stringify(this.tutorialVideos));
            this.sortBy = 'A';
            this.changeSort(this.sortBy);
            this.isLoading = false;
          } 
        });
      }, 1000);
      this.genericService.getLearningTutorialVideoList(this.gradeId, this.subjectId);
      // this.initialiseState(); // reset and set based on new parameter this time
    });
  }

  ngOnInit(): void {

  }
  decodeURIComponent(url: string): string {
    return decodeURIComponent(url);
  }

  searchWithTitle(keyWord: string): void {
    if (keyWord?.length) {
      this.tutorialVideosList = this.tutorialVideos.filter((subject: VideoList) => subject.title.toLowerCase().includes(keyWord.toLowerCase()));
    } else {
      // JSON.parse(JSON.stringify()) to break refrence
      this.tutorialVideosList = JSON.parse(JSON.stringify(this.tutorialVideos));
    }
    this.changeSort(this.sortBy);
  }

  changeSort(sort: string) {
    this.sortBy = sort;
    this.tutorialVideosList = this.genericService.sortMainArray(this.tutorialVideosList, this.sortBy);
  }

  ngOnDestroy() {
    if (this.learningTutorialSubscription$) { this.learningTutorialSubscription$.unsubscribe(); }
    if (this.learningTutorialVideosSubscription$) { this.learningTutorialVideosSubscription$.unsubscribe(); }
  }
}
