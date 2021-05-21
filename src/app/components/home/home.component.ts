import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Testimonials, TopSlider } from './carousel.constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  sliderData = TopSlider;
  testimonials = Testimonials;

  constructor() { }

  ngOnInit(): void {
  }

}
