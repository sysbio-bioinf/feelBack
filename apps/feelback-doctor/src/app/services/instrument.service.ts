import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Patient } from '../models/Patient';
import { Instrument } from '../models/Instrument';

@Injectable({
  providedIn: 'root',
})
export class InstrumentService {
  constructor() {}

  public getInstruments(): Observable<Instrument[]> {
    const instruments = [
      {
        id: '64d1c980-c32d-4b23-903a-702629e5917f',
        name: 'Distress Thermometer',
      },
      {
        id: '35b24590-cf4a-4bff-9ee4-828dba3cc9e4',
        name: 'Instrument A',
      },
      {
        id: 'f9fe3be8-9749-4c19-b03e-2be4c3e7f958',
        name: 'Instrument B',
      },
      {
        id: 'eab19dff-d4c3-46ae-99df-59db5d8e3842',
        name: 'Instrument C',
      },
    ];
    return of(instruments);
  }

  public getInstrumentById(id: string): Observable<Instrument> {
    let instruments = [];
    this.getInstruments().subscribe((data) => (instruments = data));
    for (const instrument of instruments) {
      if (instrument.id === id) {
        return of(instrument);
      }
    }
  }

}
