import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Patient } from '../models/Patient';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor() {}

  getPatients(): Observable<Patient[]> {
    const patients = [
      {
        id: '1dde001d-b1be-4244-9d5f-4f0820d877d5',
        name: 'test',
        organization: 'test',
        consultation: true,
        rating: 100,
        instruments: 3,
        screenings: 76,
      },
      {
        id: 'a0316bbf-4719-4fe3-b979-f7aa17ef915e',
        name: 'Patient A',
        organization: 'Organization A',
        consultation: true,
        rating: 95,
        instruments: 1,
        screenings: 44,
      },
      {
        id: '4f2dd126-37ba-415e-b3b2-fc06160d7099',
        name: 'Patient B',
        organization: 'Organization B',
        consultation: true,
        rating: 25,
        instruments: 2,
        screenings: 99,
      },
      {
        id: '535c13e6-e87a-4ddc-a9ee-4317b16280f1',
        name: 'Patient C',
        organization: 'Organization A',
        consultation: false,
        rating: 35,
        instruments: 1,
        screenings: 5,
      },
      {
        id: 'cc300649-3705-462c-8d88-5c72b2621986',
        name: 'Patient D',
        organization: 'Organization C',
        consultation: true,
        rating: 12,
        instruments: 2,
        screenings: 96,
      },
      {
        id: '5f8fcd45-fdd8-4be7-9b57-b1cb26ff378f',
        name: 'Patient E',
        organization: 'Organization A',
        consultation: true,
        rating: 56,
        instruments: 1,
        screenings: 30,
      },
      {
        id: 'e6139b0c-4c7b-48e7-b29d-87c3968dbff0',
        name: 'Patient F',
        organization: 'Organization C',
        consultation: false,
        rating: 71,
        instruments: 3,
        screenings: 56,
      },
      {
        id: 'c983f778-834b-4318-b383-8e2e1ea3ff13',
        name: 'Patient G',
        organization: 'Organization B',
        consultation: false,
        rating: 42,
        instruments: 1,
        screenings: 12,
      },
    ];
    return of(patients);
  }

  getPatientById(id: string): Observable<Patient> {
    let patients = [];
    this.getPatients().subscribe((data) => (patients = data));
    for (const patient of patients) {
      if (patient.id === id) {
        return of(patient);
      }
    }
  }
}
