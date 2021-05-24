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
  videoList: any = [];
  subjectId = 0;
  gradeId = 0;
  constructor(
    private route: ActivatedRoute,
    public genericService: GenericService
  ) {
    this.route.params.subscribe(params => {
      this.gradeId = params.id;
      this.subjectId = params.subjectId;
      this.genericService.getLearningTutorialVideoList(this.gradeId, this.subjectId);
      genericService.learningTutorialVideos$.subscribe(videos => {
        this.tutorialVideos = videos;
        this.changeSort('A');
      })
      // this.initialiseState(); // reset and set based on new parameter this time
    });
  }

  ngOnInit(): void {

  }
  decodeURIComponent(url: string): string {
    return decodeURIComponent(url);
  }

  changeSort(sort: string) {
    this.tutorialVideos = this.genericService.sortArray(this.tutorialVideos, sort);
  }
}
