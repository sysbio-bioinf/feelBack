import { TestBed } from '@angular/core/testing';

import { InstrumentService } from './instrument.service';
import { Apollo } from 'apollo-angular';

describe('InstrumentService', () => {
  let service: InstrumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [Apollo] });
    service = TestBed.inject(InstrumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
