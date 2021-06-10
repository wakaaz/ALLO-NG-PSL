import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoList } from 'src/app/_models/teacher-tutorial';
import { GenericService } from 'src/app/_services/generic-service';

@Component({
  selector: 'app-vedio-list',
  templateUrl: './vedio-list.component.html',
  styleUrls: ['./vedio-list.component.css']
})
export class VedioListComponent implements OnInit {
  tutorTutorial: Array<VideoList> = [];
  tutorTutorialsList: Array<VideoList> = [];

  sortBy: string;
  tutorialId: number;
  isLoading: boolean;

  constructor(
    private route: ActivatedRoute,
    public genericService: GenericService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.tutorialId = params.subjectId;
      this.isLoading = true;
      this.genericService.getTeachTutorials(params.id, params.subjectId);
      this.genericService.teacherTutorialVideosList$.subscribe(teacherTutorialVideos => {
        this.tutorTutorialsList = [];
        this.tutorTutorial = teacherTutorialVideos;
        this.isLoading = false;
        if (this.tutorTutorial?.length) {
          this.tutorTutorialsList = JSON.parse(JSON.stringify(this.tutorTutorial));
          this.sortBy = 'A';
          this.changeSort(this.sortBy)
        }
      })
    });
  }

  searchWithTitle(keyWord: string): void {
    if (keyWord?.length) {
      this.tutorTutorialsList = this.tutorTutorial.filter((video: VideoList) => video.title.toLowerCase().includes(keyWord.toLowerCase()));
    } else {
      // JSON.parse(JSON.stringify()) to break refrence
      this.tutorTutorialsList = JSON.parse(JSON.stringify(this.tutorTutorial));
    }
    this.changeSort(this.sortBy);
  }

  changeSort(sort: string): void {
    this.sortBy = sort;
    this.tutorTutorialsList = this.genericService.sortMainArray(this.tutorTutorialsList, this.sortBy);
  }
  
  decodeURIComponent(url: string): string {
    return decodeURIComponent(url);
  }

}
