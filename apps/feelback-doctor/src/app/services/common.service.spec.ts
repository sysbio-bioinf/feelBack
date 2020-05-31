import { TestBed } from '@angular/core/testing';

import { CommonService } from './common.service';
import { DatePipe } from '@angular/common';

describe('CommonService', () => {
  let service: CommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatePipe]
    });
    service = TestBed.inject(CommonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
