import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
    from: Date,
    end: Date
  ): Observable<any> {
    return this.getScreeningsDiagramCollectionsService
      .fetch({
        personId,
        instrumentId,
        from,
        end
      })
      .pipe(
        map((data) => {
          let screenings = {};
          screenings = data.data.screeningsDiagramCollections[0];
          const lineChart = screenings['axis'][0];
          const distress = [{ name: lineChart.name, series: [] }];
          for (const record of lineChart.data) {
            distress[0].series.push({
              screeningId: record.screeningId,
              name: new Date(record.x),
              value: record.y,
            });
          }
          screenings['axis'] = distress;
          return data.data.screeningsDiagramCollections;
        }),
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
