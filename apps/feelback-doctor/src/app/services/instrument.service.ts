import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  GetInstrumentsGQL,
  GetInstrumentGQL,
} from '../graphql/generated/feelback.graphql';
import { Instrument } from '../models/instrument.model';

@Injectable({
  providedIn: 'root',
})
export class InstrumentService {
  constructor(
    private instrumentsService: GetInstrumentsGQL,
    private instrumentService: GetInstrumentGQL,
  ) {}

  public getInstruments(): Observable<Instrument[]> {
    return this.instrumentsService.fetch().pipe(
      map((data) => {
        const instruments: Instrument[] = [];
        for (const instrument of data.data.instruments.edges) {
          instruments.push({
            id: instrument.node.id,
            name: instrument.node.name,
            description: instrument.node.description,
            version: instrument.node.version,
            image: instrument.node.image,
            type: instrument.node.type,
            createdAt: instrument.node.createdAt,
            updatedAt: instrument.node.updatedAt,
          });
        }
        return instruments;
      }),
    );
  }

  public getInstrument(id: string): Observable<Instrument> {
    return this.instrumentService.fetch({ id }).pipe(
      map((data) => {
        const instrument = data.data.instrument;
        return {
          id: instrument.id,
          name: instrument.name,
          description: instrument.description,
          version: instrument.version,
          image: instrument.image,
          type: instrument.type,
          createdAt: instrument.createdAt,
          updatedAt: instrument.updatedAt,
          diagram: instrument.diagram,
          payload: instrument.payload,
          rules: instrument.rules,
        };
      }),
    );
  }
}
