import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeacherTutorial } from 'src/app/_models/teacher-tutorial';
import { GenericService } from 'src/app/_services/generic-service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  paramId = 1;
  subjects = [];
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
        this.subjects = x.find(x => x.id == this.paramId)?.subjects;
        console.log('subjects >', this.subjects);
      });
    });
  }
  decodeURIComponent(url: string): string {
    return decodeURIComponent(url);
  }
}
