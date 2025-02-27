import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
  AfterViewChecked,
} from '@angular/core';
import { CursorPaging } from '../../graphql/generated/feelback.graphql';
import { FaqModel } from '../../models/faq.model';
import { FeatureModel } from '../../models/feature.model';
import { FaqService } from '../../services/api/faq.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'feelback-web-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit, AfterViewChecked {
  featuresArray: FeatureModel[] = [];
  faqs: FaqModel[] = [];

  highlights = ['a', 'b', 'c', 'd', 'e', 'f'];
  highlightHelper = [0, 1, 2];

  selectedFeature = 0;

  galleryOwl = 'gallery';
  testimonialsOwl = 'testimonial';

  public homeOffset: Number = 0;
  public featuresOffset: Number = 0;
  public getStartedOffset: Number = 0;
  public galleryOffset: Number = 0;
  public downloadOffset: Number = 0;
  public contactOffset: Number = 0;

  currentActive = 'home';

  @ViewChild('home')
  homeElement!: ElementRef;

  @ViewChild('features')
  featuresElement!: ElementRef;

  @ViewChild('getStarted')
  getStartedElement!: ElementRef;

  @ViewChild('gallery')
  galleryElement!: ElementRef;

  @ViewChild('download')
  downloadElement!: ElementRef;

  @ViewChild('contact')
  contactElement!: ElementRef;

  // owl carousel (gallery)
  gallerySlidesStore = [
    {
      id: 0,
      src: './assets/images/screens/screen-01.png',
      alt: 'image',
      title: '',
    },
    {
      id: 1,
      src: './assets/images/screens/screen-02.png',
      alt: 'image',
      title: '',
    },
    {
      id: 2,
      src: './assets/images/screens/screen-03.png',
      alt: 'image',
      title: '',
    },
    {
      id: 3,
      src: './assets/images/screens/screen-04.png',
      alt: 'image',
      title: '',
    },
  ];
  // owl carousel (testimonials)
  testimonialsSlidesStore = [
    {
      id: 0,
      src: './assets/images/client.png',
      alt: 'client',
      title: '',
      name: 'Crystal Gordon',
      location: 'United States',
      review:
        'Review 1: Uniquely streamline highly efficient scenarios and 24/7 initiatives.Cnveniently embrace multifunctional ideas through proactive customer service. Distinctively conceptualize 2.0 intellectual capital via user-centric partnerships.',
    },
    {
      id: 1,
      src: './assets/images/client.png',
      alt: 'client',
      title: '',
      name: 'Monika Musterfrau',
      location: 'Germany',
      review:
        'Review 2: Uniquely streamline highly efficient scenarios and 24/7 initiatives.Cnveniently embrace multifunctional ideas through proactive customer service. Distinctively conceptualize 2.0 intellectual capital via user-centric partnerships.',
    },
    {
      id: 2,
      src: './assets/images/client.png',
      alt: 'client',
      title: '',
      name: 'Alice Bob',
      location: 'United States',
      review:
        'Review 3: Uniquely streamline highly efficient scenarios and 24/7 initiatives.Cnveniently embrace multifunctional ideas through proactive customer service. Distinctively conceptualize 2.0 intellectual capital via user-centric partnerships.',
    },
  ];

  // customOptions for testimonials
  testimonialsCustomOptions: Partial<OwlOptions> = {
    responsive: {
      0: {
        items: 1,
      },
    },
    autoplay: false,
    loop: false,
    dots: false,
    nav: true,
  };

  constructor(readonly faqService: FaqService) {}

  ngOnInit(): void {
    this.featuresArray.push(
      {
        id: 'a',
        title: 'app.pages.start.features.features.a.title',
        headline: 'app.pages.start.features.features.a.title',
        lead: 'app.pages.start.features.features.a.title',
        text: 'app.pages.start.features.features.a.text',
        image: 'passport',
      },
      {
        id: 'b',
        title: 'app.pages.start.features.features.b.title',
        headline: 'app.pages.start.features.features.b.title',
        lead: 'app.pages.start.features.features.b.title',
        text: 'app.pages.start.features.features.b.text',
        image: 'user',
      },
      {
        id: 'c',
        title: 'app.pages.start.features.features.c.title',
        headline: 'app.pages.start.features.features.c.title',
        lead: 'app.pages.start.features.features.c.title',
        text: 'app.pages.start.features.features.c.text',
        image: 'smiley',
      },
      {
        id: 'd',
        title: 'app.pages.start.features.features.d.title',
        headline: 'app.pages.start.features.features.d.title',
        lead: 'app.pages.start.features.features.d.title',
        text: 'app.pages.start.features.features.d.text',
        image: 'file',
      },
    );

    this.loadFaqs({ first: 10 });
  }

  ngAfterViewChecked() {
    this.homeOffset = this.homeElement.nativeElement.offsetTop;
    this.featuresOffset = this.featuresElement.nativeElement.offsetTop - 56;
    this.getStartedOffset = this.getStartedElement.nativeElement.offsetTop - 56;
    this.galleryOffset = this.galleryElement.nativeElement.offsetTop - 56;
    this.downloadOffset = this.downloadElement.nativeElement.offsetTop - 56;
    this.contactOffset = this.contactElement.nativeElement.offsetTop - 56;
  }

  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    const windowScroll = window.pageYOffset;
    // set css class for navbar-items (active)
    if (windowScroll >= this.homeOffset && windowScroll < this.featuresOffset) {
      this.currentActive = 'home';
    } else if (
      windowScroll >= this.featuresOffset &&
      windowScroll < this.getStartedOffset
    ) {
      this.currentActive = 'features';
    } else if (
      windowScroll >= this.getStartedOffset &&
      windowScroll < this.galleryOffset
    ) {
      this.currentActive = 'getStarted';
    } else if (
      windowScroll >= this.galleryOffset &&
      windowScroll < this.downloadOffset
    ) {
      this.currentActive = 'gallery';
    } else if (
      windowScroll >= this.downloadOffset &&
      windowScroll < this.contactOffset
    ) {
      this.currentActive = 'download';
    } else if (windowScroll >= this.contactOffset) {
      this.currentActive = 'contact';
    } else {
      this.currentActive = 'home';
    }
  }

  selectFeature(index: number) {
    this.selectedFeature = index;
  }

  loadFaqs(paging: CursorPaging = {}) {
    this.faqService.getFaqs(paging).then((result) => {
      const nodes = result.edges.map((entry) => {
        return {
          id: entry.node.id,
          question: entry.node.question,
          answer: entry.node.answer,
        } as FaqModel;
      });
      this.faqs.push(...nodes);

      if (result.pageInfo.hasNextPage === true) {
        this.loadFaqs({ after: result.pageInfo.endCursor, first: 10 });
      }
    });
  }
}
