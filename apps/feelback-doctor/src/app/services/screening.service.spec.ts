import { TestBed } from '@angular/core/testing';

import { ScreeningService } from './screening.service';
import { Apollo } from 'apollo-angular';

describe('ScreeningService', () => {
  let service: ScreeningService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Apollo]
    });
    service = TestBed.inject(ScreeningService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
