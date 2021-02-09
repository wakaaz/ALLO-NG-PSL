import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GenericService } from 'src/app/_services/generic-service';

@Component({
  selector: 'app-videos-list',
  templateUrl: './videos-list.component.html',
  styleUrls: ['./videos-list.component.css']
})
export class VideosListComponent implements OnInit {

  videoList: any= []
  subjectId = 0;
  gradeId= 0;
  constructor(
    private route: ActivatedRoute,
    public genericService: GenericService
  ) {
    this.route.params.subscribe(params => {
      this.gradeId = params.id;
      this.subjectId = params.subjectId;
      this.genericService.getLearningTutorialVideoList(this.gradeId, this.subjectId);
      // this.initialiseState(); // reset and set based on new parameter this time
    });
   }

  ngOnInit(): void {
   
  }
  decodeURIComponent(url: string): string {
    return decodeURIComponent(url);
  }

}
