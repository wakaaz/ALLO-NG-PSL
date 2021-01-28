import { Component, OnInit } from '@angular/core';
import { GenericService } from 'src/app/_services/generic-service';

@Component({
  selector: 'app-teachers-tutorial',
  templateUrl: './teachers-tutorial.component.html',
  styleUrls: ['./teachers-tutorial.component.css']
})
export class TeachersTutorialComponent implements OnInit {

  constructor(
    public genericService: GenericService
  ) { }

  ngOnInit(): void {
    let length = 0;
    this.genericService.teacherTutorial$.subscribe(x => {
      length = x.length;
    });
    if (length === 0) {
      this.genericService.getPreferences();
    }
  }

}
