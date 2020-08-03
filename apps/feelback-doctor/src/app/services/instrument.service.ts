import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  GetInstrumentsGQL, GetInstrumentGQL,
} from '../graphql/generated/feelback.graphql';

@Injectable({
  providedIn: 'root',
})
export class InstrumentService {
  constructor(private instrumentsService: GetInstrumentsGQL, private instrumentService: GetInstrumentGQL) {}

  public getInstruments(): Observable<any> {
    return this.instrumentsService.fetch().pipe(
      map((data) => {
        return data.data.instruments.edges;
      }),
    );
  }

  public getInstrument(id: string): Observable<any> {
    return this.instrumentService.fetch({id}).pipe(
      map((data) => {
        return data.data;
      }),
    );
  }

  public checkIfInstrumentExists(id: string): boolean {
    return true;
  }
}
