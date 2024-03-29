import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbCarousel, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { GenericService } from 'src/app/_services/generic-service';
import { Testimonials, TopSlider } from './carousel.constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, AfterViewInit {
  sliderData = TopSlider;
  testimonials = Testimonials;

  name: string;
  email: string;
  recommendedWord: string;
  emailPattern: RegExp;

  isSubmitted: boolean;
  recommendSuccess: boolean;
  recommendError: boolean;
  isLoading: boolean;

  @ViewChild('topCarousel') carousel: NgbCarousel;

  constructor(
    private genericService: GenericService,
  ) { }

  ngOnInit(): void {
    this.emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    this.isLoading = true;
    setTimeout(() => {
      if (this.carousel) {
        this.carousel.cycle();
      }
      this.isLoading = false;
    }, 6000);
  }

  ngAfterViewInit(): void {
    if (this.carousel) {
      this.carousel.pause();
    }
  }

  onSwipe(direction: string) {
    this.carousel.pause();
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
        if (res.message === 'Success') {
          this.recommendError = false;
          this.recommendSuccess = true;
        } else {
          this.recommendError = true;
          this.recommendSuccess = false;
        }
        this.resetForm();
        this.resetMessages();
      }, error => {
        this.recommendError = true;
        this.recommendSuccess = false;
        this.resetForm(); // for testing
        this.resetMessages();
        console.log(`Error in recommend word :>>`, error);
      });
    }
  }

  resetMessages() {
    setTimeout(() => {
      this.recommendError = false;
      this.recommendSuccess = false;
    }, 5000);
  }

  resetForm(): void {
    this.isSubmitted = false;
    this.name = '';
    this.email = '';
    this.recommendedWord = '';
  }

}
