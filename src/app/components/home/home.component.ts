import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  sliderData = [
    {
      title: 'RESOURCES',
      description: 'Learning Pakistan Sign Language is easy with these resources.',
      link: '/resources',
      image: 'https://s3-eu-west-1.amazonaws.com/psl-web-1/images//resourcesSliderImage-1556523290965.jpg'
    },
    {
      title: 'TEACHER TUTORIALS',
      description: 'Over 150 primary classroom based demos in PSL, with easy-to-use methodology and learning tools to train teachers of the Deaf.',
      link: '/teachers',
      image: 'https://s3-eu-west-1.amazonaws.com/psl-web-1/images//ttSliderImage-1556523325735.jpg'
    },
    {
      title: 'PSL STORIES',
      description: `Over 40 richly illustrated and animated stories presented in PSL with the option of Urdu or English translation and voice over.`,
      link: '/stories',
      image: 'https://s3-eu-west-1.amazonaws.com/psl-web-1/images//pslStoriesSliderImage-1556523349694.jpg'
    },
    {
      title: 'LEARNING TUTORIALS',
      description: 'Urdu, English and basic Math in PSL, with over 200 illustrated and animated tutorials',
      link: '/primaryleveltutorials',
      image: 'https://s3-eu-west-1.amazonaws.com/psl-web-1/images//learningTutorialsSliderImage-1556523369049.jpg'
    },
    {
      title: 'PSL DEVELOPMENT TEAM',
      description: 'The PSL development team is comprised of educators, teachers, PSL sign developers and curriculum designers.',
      link: '/about',
      image: 'https://s3-eu-west-1.amazonaws.com/psl-web-1/images//pslDevSliderImage-1556523401624.jpg'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
