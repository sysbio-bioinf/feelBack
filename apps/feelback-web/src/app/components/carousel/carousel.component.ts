import { Component, OnInit, Input } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'feelback-web-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  @Input() select = '';

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplaySpeed: 1000,
    autoplayHoverPause: true,
    margin: 30,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: [
      '<span class="fas fa-arrow-left"></span>',
      '<span class="fas fa-arrow-right"></span>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 2,
      },
      940: {
        items: 3,
      },
    },
    nav: true,
  };

  gallerySlidesStore = [
    {
      id: 0,
      src: './assets/images/screens/screen-01.png',
      alt: 'image',
      title: 'first',
    },
    {
      id: 1,
      src: './assets/images/screens/screen-02.png',
      alt: 'image',
      title: 'second',
    },
    {
      id: 2,
      src: './assets/images/screens/screen-03.png',
      alt: 'image',
      title: 'third',
    },
    {
      id: 3,
      src: './assets/images/screens/screen-04.png',
      alt: 'image',
      title: 'fourth',
    },
  ];

  testimonialsSlidesStore = [
    {
      id: 0,
      src: './assets/images/client.png',
      alt: 'client',
      title: 'firstT',
      name: 'Crystal Gordon',
      location: 'United States',
      review:
        'Uniquely streamline highly efficient scenarios and 24/7 initiatives.Cnveniently embrace multifunctional ideas through proactive customer service. Distinctively conceptualize 2.0 intellectual capital via user-centric partnerships.',
    },
    {
      id: 1,
      src: './assets/images/client.png',
      alt: 'client',
      title: 'secondT',
      name: 'Monika Musterfrau',
      location: 'Germany',
      review:
        'Uniquely streamline highly efficient scenarios and 24/7 initiatives.Cnveniently embrace multifunctional ideas through proactive customer service. Distinctively conceptualize 2.0 intellectual capital via user-centric partnerships.',
    },
    {
      id: 2,
      src: './assets/images/client.png',
      alt: 'client',
      title: 'thirdT',
      name: 'Alice Bob',
      location: 'United States',
      review:
        'Uniquely streamline highly efficient scenarios and 24/7 initiatives.Cnveniently embrace multifunctional ideas through proactive customer service. Distinctively conceptualize 2.0 intellectual capital via user-centric partnerships.',
    },
  ];

  constructor() {}

  ngOnInit(): void {
    if (this.select === 'testimonials') {
      this.customOptions.responsive = {
        0: {
          items: 1,
        },
        400: {
          items: 1,
        },
        740: {
          items: 1,
        },
        940: {
          items: 1,
        },
      };
      this.customOptions.autoplay = false;
      this.customOptions.loop = false;
      this.customOptions.dots = true;
    }
  }
}
