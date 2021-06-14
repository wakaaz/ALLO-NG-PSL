import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  isLoading: boolean;
  constructor() { }

  ngOnInit(): void {
     this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 6000);
  }

}
