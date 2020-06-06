import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import {
  GetScreeningGQL,
  Screening,
  GetScreeningsDiagramCollectionsGQL,
} from '../graphql/generated/feelback.graphql';

@Injectable({
  providedIn: 'root',
})
export class ScreeningService {
  constructor(
    private getScreeningService: GetScreeningGQL,
    private getScreeningsDiagramCollectionsService: GetScreeningsDiagramCollectionsGQL,
  ) {}

  public getScreenings(
    personId: string,
    instrumentId: string,
  ): Observable<any> {
    return this.getScreeningsDiagramCollectionsService
      .fetch({
        personId,
        instrumentId,
      })
      .pipe(
        map((data) => {
          const lineChart = data.data.screeningsDiagramCollections[0].axis[0];
          const distress = [{ name: lineChart.name, series: [] }];
          for (const record of lineChart.data) {
            distress[0].series.push({
              screeningId: record.screeningId,
              name: new Date(record.x),
              value: record.y,
            });
          }
          data.data.screeningsDiagramCollections[0].axis = distress;
          return data.data.screeningsDiagramCollections;
        }),
        delay(300)
      );
  }

  public getScreening(id: string): Observable<Screening> {
    return this.getScreeningService
      .fetch({
        id: id,
      })
      .pipe(
        map((data) => {
          return data.data.screening;
        }),
      );
  }

  public checkIfScreeningExists(id: string): boolean {
    // TODO
    // for (const screening of this.screenings[0].series) {
    //   if (screening.id === id) {
    //     return true;
    //   }
    // }
    return true;
  }
}
