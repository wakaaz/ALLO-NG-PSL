import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenericService } from 'src/app/_services/generic-service';

@Component({
  selector: 'app-teachers-tutorial',
  templateUrl: './teachers-tutorial.component.html',
  styleUrls: ['./teachers-tutorial.component.css']
})
export class TeachersTutorialComponent implements OnInit {

  constructor(
    private router: Router,
    public genericService: GenericService
  ) { }

  ngOnInit(): void {
    let length = 0;
    this.genericService.teacherTutorial$.subscribe(x => {
      if (x !== null) {
        length = x.length;
      }
    });
    if (length === 0) {
      this.genericService.getPreferences();
    }
  }

  goToDictionary(categoryId: string) {
    this.router.navigateByUrl(`/teacherTutorials/${categoryId}`);
  }
}
