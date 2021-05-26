import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
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
  @ViewChild('topCarousel') carousel: NgbCarousel;

  constructor() { }

  ngOnInit(): void {
  }

  onSwipe(direction: string) {
    if (direction === 'left') {
      this.carousel.next();
    } else {
      this.carousel.prev();
    }
  }

}
