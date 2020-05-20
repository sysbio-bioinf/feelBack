import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import {
  GetInstrumentsGQL,
  Instrument,
} from '../graphql/generated/feelback.graphql';

@Injectable({
  providedIn: 'root',
})
export class InstrumentService {
  constructor(private instrumentService: GetInstrumentsGQL) {}

  private instruments = [
    {
      id: '53f2a7c3-9c37-4a52-9194-8a3186af6f57',
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1.0,
      type: '',
      changelog: '',
      name: 'Distress Thermometer',
      description:
        'Das NCCN Distress-Thermometer ist ein vom National Comprehensive Cancer Network (NCCN) entwickeltes Screeninginstrument zur Erfassung psychosozialer Belastungen bei onkologischen Patienten.',
      image:
        'https://www.gvec.org/wp-content/uploads/2019/10/Breast-Cancer-Awareness-Month-2019-1080x675.jpg',
    },
    {
      id: '35b24590-cf4a-4bff-9ee4-828dba3cc9e4',
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1.0,
      type: '',
      changelog: '',
      name: 'Instrument A',
      description:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
      image:
        'https://img.icons8.com/office/64/000000/caduceus.png',
    },
    {
      id: 'f9fe3be8-9749-4c19-b03e-2be4c3e7f958',
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1.0,
      type: '',
      changelog: '',
      name: 'Instrument B',
      description:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
      image:
        'https://img.icons8.com/plasticine/100/000000/hospital-room.png',
    },
    {
      id: 'eab19dff-d4c3-46ae-99df-59db5d8e3842',
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1.0,
      type: '',
      changelog: '',
      name: 'Instrument C',
      description:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
      image:
        'https://img.icons8.com/doodle/48/000000/treatment-list.png',
    },
  ];

  public getInstruments(): Observable<Instrument[]> {
    return of(this.instruments).pipe(delay(300));
  }

  public getInstrumentById(id: string): Observable<any> {
    if (id === '53f2a7c3-9c37-4a52-9194-8a3186af6f57') {
      return this.instrumentService.fetch().pipe(
        map((data) => {
          const instruments = data.data.instruments.edges;
          const distress = instruments[0].node;
          if (instruments.length === 0) {
            distress['error'] = true;
          }
          return distress;
        }),
      );
    } else if (id === '35b24590-cf4a-4bff-9ee4-828dba3cc9e4') {
      this.instruments[1]['error'] = true;
      return of(this.instruments[1]).pipe(delay(1500));
    } else if (id === 'f9fe3be8-9749-4c19-b03e-2be4c3e7f958') {
      return of(this.instruments[2]).pipe(delay(300));
    } else if (id === 'eab19dff-d4c3-46ae-99df-59db5d8e3842') {
      return of(this.instruments[3]).pipe(delay(500));
    }
  }

  public checkIfInstrumentExists(id: string): boolean {
    for (const instrument of this.instruments) {
      if (instrument.id === id) {
        return true;
      }
    }
    return false;
  }
}
