import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'src/app/_models/learning-tutorial';
import { TeacherTutorial } from 'src/app/_models/teacher-tutorial';
import { GenericService } from 'src/app/_services/generic-service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  paramId = 1;
  subjects: Array<Subject> = [];
  subjectsList: Array<Subject> = [];
  sortBy: string;
  constructor(
    private route: ActivatedRoute,
    public genericService: GenericService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.paramId = params.id;
      // this.genericService.getPreferences();
      // this.initialiseState(); // reset and set based on new parameter this time
      this.genericService.teacherTutorial$.subscribe((x: any) => {
        this.subjectsList = [];
        this.subjects = x.find(x => x.id == this.paramId)?.subjects;
        if (this.subjects?.length) {
          // JSON.parse(JSON.stringify()) to break refrence
          this.subjectsList = JSON.parse(JSON.stringify(this.subjects));
          this.sortBy = 'A';
          this.changeSort(this.sortBy);
        }
      });
    });
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
