import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';
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

  public screenings;
  public index: number;
  public timerange: string;

  public getScreenings(
    personId: string,
    instrumentId: string,
    from: Date,
    end: Date,
    literal: string,
  ): Observable<any> {
    this.timerange = literal;
    return this.getScreeningsDiagramCollectionsService
      .fetch({
        personId,
        instrumentId,
        from,
        end,
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
          this.screenings = distress[0].series;
          screenings['axis'] = distress;
          return data.data.screeningsDiagramCollections;
        }),
      );
  }

  public getScreening(
    personId: string,
    instrumentId: string,
    screeningId: string,
  ): Observable<Screening> {
    if (!this.screenings) {
      const currentYear = new Date().getFullYear();
      return this.getScreenings(
        personId,
        instrumentId,
        new Date(currentYear, 0, 1),
        new Date(currentYear, 11, 31, 23, 59, 59),
        'current-year',
      ).pipe(
        concatMap((data) => {
          this.screenings = data[0].axis[0].series;
          return this.loadScreening(screeningId);
        }),
      );
    } else {
      return this.loadScreening(screeningId);
    }
  }

  private loadScreening(id: string): Observable<Screening> {
    for (let i = 0; i < this.screenings.length; i++) {
      if (this.screenings[i].screeningId === id) {
        this.index = i;
        break;
      }
    }
    return this.getScreeningService
      .fetch({
        id,
      })
      .pipe(
        map((data) => {
          return data.data.screening;
        }),
      );
  }

  public paginateScreenings(index: number): string {
    this.index = index;
    return this.screenings[this.index].screeningId;
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
