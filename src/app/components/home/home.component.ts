import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { GenericService } from 'src/app/_services/generic-service';
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

  name: string;
  email: string;
  recommendedWord: string;
  emailPattern: RegExp;

  isSubmitted: boolean;
  isLoading: boolean;

  @ViewChild('topCarousel') carousel: NgbCarousel;

  constructor(
    private genericService: GenericService,
  ) { }

  ngOnInit(): void {
    this.emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 6000);
  }

  onSwipe(direction: string) {
    if (direction === 'left') {
      this.carousel.next();
    } else {
      this.carousel.prev();
    }
  }

  recommendWord(): void {
    this.isSubmitted = true;
    if (!this.name || !this.email || !this.recommendedWord || !this.emailPattern.test(this.email)) {
      return;
    } else {
      this.genericService.recommendAWord({name: this.name, email: this.email, word: this.recommendedWord}).subscribe(res => {
        this.resetForm();
      }, error => {
        this.resetForm(); // for testing
        console.log(`Error in recommend word :>>`, error);
      });
    }
  }

  resetForm(): void {
    this.isSubmitted = false;
    this.name = '';
    this.email = '';
    this.recommendedWord = '';
  }

}
