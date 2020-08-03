import { TestBed } from '@angular/core/testing';

import { PatientService } from './patient.service';
import { Apollo } from 'apollo-angular';

describe('PatientService', () => {
  let service: PatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [Apollo] });
    service = TestBed.inject(PatientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
