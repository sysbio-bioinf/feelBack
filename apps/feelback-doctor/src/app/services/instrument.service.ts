import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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
        description:
          'Das NCCN Distress-Thermometer ist ein vom National Comprehensive Cancer Network (NCCN) entwickeltes Screeninginstrument zur Erfassung psychosozialer Belastungen bei onkologischen Patienten.',
        image:
          'https://www.gvec.org/wp-content/uploads/2019/10/Breast-Cancer-Awareness-Month-2019-1080x675.jpg',
      },
      {
        id: '35b24590-cf4a-4bff-9ee4-828dba3cc9e4',
        name: 'Instrument A',
        description:
          'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
        image:
          'https://st2.depositphotos.com/5722118/11457/v/950/depositphotos_114576810-stock-illustration-coloring-page-outline-of-medical.jpg',
      },
      {
        id: 'f9fe3be8-9749-4c19-b03e-2be4c3e7f958',
        name: 'Instrument B',
        description:
          'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
        image:
          'https://st2.depositphotos.com/5722118/11457/v/950/depositphotos_114576810-stock-illustration-coloring-page-outline-of-medical.jpg',
      },
      {
        id: 'eab19dff-d4c3-46ae-99df-59db5d8e3842',
        name: 'Instrument C',
        description:
          'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
        image:
          'https://st2.depositphotos.com/5722118/11457/v/950/depositphotos_114576810-stock-illustration-coloring-page-outline-of-medical.jpg',
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
