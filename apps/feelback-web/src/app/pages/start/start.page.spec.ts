import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartPage } from './start.page';
import { FaqService } from '../../services/api/faq.service';
import { ComponentsModule } from '../../modules/components.module';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { RouterTestingModule } from '@angular/router/testing';

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ComponentsModule,
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
    expect(component.features.length).toBeGreaterThan(1);
    expect(component.faqs.length).toBe(1);
  });

  it('has four features', () => {
    expect(component.features.length).toBe(4);
  });
});
