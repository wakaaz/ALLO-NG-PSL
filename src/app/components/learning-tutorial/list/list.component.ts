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
  subjectsList: Array<Subject>;
  data: LearningTutorial[] = [];
  sortBy: string;
  isLoading: boolean;
  paramId = 0;
  constructor(
    private route: ActivatedRoute,
    public genericService: GenericService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // this.genericService.getStoriesVedios(params.id);
      this.paramId = params.id;
      // this.learingTutorialSubject();
      this.isLoading = true;
      this.genericService.learningTutorial$.subscribe((x: LearningTutorial[]) => {
        if (x !== null) {
          this.data = x;
          this.learingTutorialSubject();
        }
      });
    });
  }
  learingTutorialSubject() {
    this.subjects = this.data.find(x => x.id == this.paramId)?.subjects;
    console.log('', this.subjects);
    // this.subjectsList = [];
    if (this.subjects?.length) {
      // JSON.parse(JSON.stringify()) to break refrence
      this.subjectsList = JSON.parse(JSON.stringify(this.subjects));
      this.sortBy = 'A';
      this.changeSort(this.sortBy);
      this.isLoading = false;
    } else {
      this.isLoading = false;
    }
  }

  searchWithTitle(keyWord: string): void {
    if (keyWord?.length) {
      this.subjectsList = this.subjects.filter((subject: Subject) => subject.title.toLowerCase().includes(keyWord.toLowerCase()));
    } else {
      // JSON.parse(JSON.stringify()) to break refrence
      this.subjectsList = JSON.parse(JSON.stringify(this.subjects));
    }
    this.changeSort(this.sortBy);
  }

  changeSort(sort: string) {
    this.sortBy = sort;
    this.subjectsList = this.genericService.sortMainArray(this.subjectsList, this.sortBy);
  }
  decodeURIComponent(url: string): string {
    return decodeURIComponent(url);
  }
}
