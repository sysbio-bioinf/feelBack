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
        id: 0,
        name: 'test',
        organization: 'test',
        consultation: true,
        rating: 100,
        instruments: 3,
        screenings: 76,
      },
      {
        id: 1,
        name: 'Patient A',
        organization: 'Organization A',
        consultation: true,
        rating: 95,
        instruments: 1,
        screenings: 44,
      },
      {
        id: 2,
        name: 'Patient B',
        organization: 'Organization B',
        consultation: true,
        rating: 25,
        instruments: 2,
        screenings: 99,
      },
      {
        id: 3,
        name: 'Patient C',
        organization: 'Organization A',
        consultation: false,
        rating: 35,
        instruments: 1,
        screenings: 5,
      },
      {
        id: 4,
        name: 'Patient D',
        organization: 'Organization C',
        consultation: true,
        rating: 12,
        instruments: 2,
        screenings: 96,
      },
      {
        id: 5,
        name: 'Patient E',
        organization: 'Organization A',
        consultation: true,
        rating: 56,
        instruments: 1,
        screenings: 30,
      },
      {
        id: 6,
        name: 'Patient F',
        organization: 'Organization C',
        consultation: false,
        rating: 71,
        instruments: 3,
        screenings: 56,
      },
      {
        id: 7,
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

  getPatientByName(name: string): Observable<Patient> {
    let patients = [];
    this.getPatients().subscribe((data) => (patients = data));
    for (const patient of patients) {
      if (patient.name === name) {
        return of(patient);
      }
    }
  }
}
