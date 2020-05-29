import { TestBed } from '@angular/core/testing';

import { FaqService } from './faq.service';
import { Apollo } from 'apollo-angular';

describe('FaqService', () => {
  let service: FaqService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Apollo]
    });
    service = TestBed.inject(FaqService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
