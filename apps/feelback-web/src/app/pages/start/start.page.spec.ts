import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartPage } from './start.page';
import { FaqService } from '../../services/api/faq.service';
import { ComponentsModule } from '../../modules/components.module';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('StartPage', () => {
  let component: StartPage;
  let fixture: ComponentFixture<StartPage>;

  const mockFaqReturnMock = {
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
      startCursor: null,
      endCursor: null,
    },
    edges: [
      {
        node: {
          id: 1,
          question: 'what is this?',
          answer: 'Landing Page',
        },
      },
    ],
  };

  const mockFaqReturnMockOnce = {
    pageInfo: {
      hasNextPage: true,
      hasPreviousPage: false,
      startCursor: null,
      endCursor: null,
    },
    edges: [
      {
        node: {
          id: 1,
          question: 'what is this?',
          answer: 'Landing Page',
        },
      },
    ],
  };

  const faqServiceMock = {
    getFaqs: jest
      .fn(
        (paging: any) =>
          new Promise((resolve) => {
            resolve(mockFaqReturnMock);
          }),
      )
      .mockReturnValueOnce(
        new Promise((resolve) => {
          resolve(mockFaqReturnMockOnce);
        }),
      ),
  };

  const getPageYOffsetMock = jest
    .fn()
    .mockRejectedValueOnce(0)
    .mockRejectedValueOnce(50)
    .mockRejectedValueOnce(100);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ComponentsModule,
        BrowserAnimationsModule,
        TranslateTestingModule.withTranslations('en', {}),
        RouterTestingModule,
      ],
      providers: [{ provide: FaqService, useValue: faqServiceMock }],
      declarations: [StartPage],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if everything is set', () => {
    expect(component.featuresArray.length).toBeGreaterThan(1);
    expect(component.faqs.length).toBe(1);
  });

  it('has four features', () => {
    expect(component.featuresArray.length).toBe(4);
  });

  it('should handle scroll-events', () => {
    component.homeOffset = 0;
    component.featuresOffset = 500;
    component.getStartedOffset = 1000;
    component.galleryOffset = 1500;
    component.downloadOffset = 2000;
    component.contactOffset = 2500;
    component.handleScroll();
    expect(component.currentActive).toMatch(/home/);
    window = Object.assign(window, { pageYOffset: 600 });
    component.handleScroll();
    expect(component.currentActive).toMatch(/features/);
    window = Object.assign(window, { pageYOffset: 1100 });
    component.handleScroll();
    expect(component.currentActive).toMatch(/getStarted/);
    window = Object.assign(window, { pageYOffset: 1600 });
    component.handleScroll();
    expect(component.currentActive).toMatch(/gallery/);
    window = Object.assign(window, { pageYOffset: 2100 });
    component.handleScroll();
    expect(component.currentActive).toMatch(/download/);
    window = Object.assign(window, { pageYOffset: 2600 });
    component.handleScroll();
    expect(component.currentActive).toMatch(/contact/);
    component.homeOffset = 100;
    window = Object.assign(window, { pageYOffset: 0 });
    component.handleScroll();
    expect(component.currentActive).toMatch(/home/);
  });

  it('should set the feature id', () => {
    expect(component.selectedFeature).toBe(0);
    component.featuresArray.forEach((value, index) => {
      component.selectFeature(index);
      expect(component.selectedFeature).toBe(index);
    });
  });
});
