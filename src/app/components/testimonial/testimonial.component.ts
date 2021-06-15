import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent implements OnInit {

  isLoading: boolean;
  constructor() { }

  ngOnInit(): void {
     this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 6000);
  }

}
