import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LearningTutorial, Subject } from 'src/app/_models/learning-tutorial';
import { GenericService } from 'src/app/_services/generic-service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  subjects: Subject[] = [];
  data: LearningTutorial[] = [];
  paramId = 0;
  constructor(
    private route: ActivatedRoute,
    public genericService: GenericService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // this.genericService.getStoriesVedios(params.id);
      this.paramId = params.id;
      this.learingTutorialSubject();
    });
    this.genericService.learningTutorial$.subscribe((x: LearningTutorial[]) => {
      this.data = x;
      this.learingTutorialSubject();
    });
  }
  learingTutorialSubject() {
    this.subjects = this.data.find(x => x.id == this.paramId)?.subjects;
    console.log('', this.subjects);
  }
  decodeURIComponent(url: string): string {
    return decodeURIComponent(url);
  }
}
