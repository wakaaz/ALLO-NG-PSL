import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fesf',
  templateUrl: './fesf.component.html',
  styleUrls: ['./fesf.component.css']
})
export class FesfComponent implements OnInit {

  isLoading: boolean;
  constructor() { }

  ngOnInit(): void {
     this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 6000);
  }

}
