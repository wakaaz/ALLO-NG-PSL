import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css']
})
export class PartnersComponent implements OnInit {

  isLoading: boolean;
  constructor() { }

  ngOnInit(): void {
     this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 6000);
  }

}
