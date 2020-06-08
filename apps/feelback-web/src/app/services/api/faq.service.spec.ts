import { TestBed } from '@angular/core/testing';

import { FaqService } from './faq.service';
import {
  GetFaqsGQL,
  CursorPaging,
} from '../../graphql/generated/feelback.graphql';
//import { Apollo } from 'apollo-angular';
import { of } from 'rxjs';

describe('FaqService', () => {
  let service: FaqService;

  const mockedData = {
    data: {
      faqs: {
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: false,
        },
        edges: [
          {
            node: {
              id: 1,
              question: 'what is this?',
              answer: 'Landing Page',
              isActive: true,
            },
          },
        ],
      },
    },
  };

  const mockPaging = {};
  const mockPaging2: CursorPaging = {
    before: null,
    after: null,
    first: null,
    last: null,
  };

  const getFaqsServiceMock = {
    fetch: jest.fn((pagination: any) => {
      return of(mockedData);
    }),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: GetFaqsGQL, useValue: getFaqsServiceMock }],
    });
    service = TestBed.inject(FaqService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('getFaqs extracts faqs out of backend response', () => {
    service.getFaqs(mockPaging).then((res) => {
      expect(res).toBe(mockedData.data.faqs);
    });
    service.getFaqs(mockPaging2).then((res) => {
      expect(res).toBe(mockedData.data.faqs);
    });
  });
});
