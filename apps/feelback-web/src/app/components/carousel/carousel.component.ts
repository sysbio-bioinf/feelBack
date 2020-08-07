import { Component, OnInit, Input } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

interface SlideStoreInterface {
  id: number;
  src: string;
  alt: string;
  title: string;
  name?: string;
  location?: string;
  review?: string;
}

@Component({
  selector: 'feelback-web-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  @Input() select = '';

  @Input() slideStore: SlideStoreInterface[] = [];

  @Input() customOptions: Partial<OwlOptions> = {};

  defaultOptions: OwlOptions = {
    loop: true,
    lazyLoad: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplaySpeed: 1000,
    autoplayHoverPause: true,
    margin: 30,
    center: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
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
        items: 2,
      },
      740: {
        items: 2,
      },
      940: {
        items: 3,
      },
    },
    nav: false,
  };

  constructor() {}

  ngOnInit(): void {
    this.customOptions = { ...this.defaultOptions, ...this.customOptions };
  }
}
