import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoList } from 'src/app/_models/learning-tutorial';
import { GenericService } from 'src/app/_services/generic-service';

@Component({
  selector: 'app-videos-list',
  templateUrl: './videos-list.component.html',
  styleUrls: ['./videos-list.component.css']
})
export class VideosListComponent implements OnInit {

  tutorialVideos: Array<VideoList> = [];
  tutorialVideosList: VideoList[];
  videoList: any = [];
  sortBy: string;
  isLoading: boolean;
  subjectId = 0;
  gradeId = 0;
  constructor(
    private route: ActivatedRoute,
    public genericService: GenericService
  ) {
    this.route.params.subscribe(params => {
      this.gradeId = params.id;
      this.subjectId = params.subjectId;
      this.isLoading = true;
      this.genericService.getLearningTutorialVideoList(this.gradeId, this.subjectId);
      genericService.learningTutorialVideos$.subscribe(videos => {
        // this.tutorialVideosList = [];
        console.log('Videos', videos);
        this.tutorialVideos = videos;
        this.tutorialVideosList = JSON.parse(JSON.stringify(this.tutorialVideos));
        this.sortBy = 'A';
        this.changeSort(this.sortBy);
        this.isLoading = false;
      })
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
}
