import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';
import {
  GetScreeningGQL,
  Screening,
  GetScreeningsDiagramCollectionsGQL,
} from '../graphql/generated/feelback.graphql';
import { ScreeningChart } from '../models/screening-chart.model';
import { ChartDataPoint } from '../models/chart-data-point.model';

@Injectable({
  providedIn: 'root',
})
export class ScreeningService {
  constructor(
    private getScreeningService: GetScreeningGQL,
    private getScreeningsDiagramCollectionsService: GetScreeningsDiagramCollectionsGQL,
  ) {}

  public screenings: ChartDataPoint[];
  public index: number;
  public timerange: string;

  public getScreeningChart(
    personId: string,
    instrumentId: string,
    from: Date,
    end: Date,
    literal: string,
  ): Observable<ScreeningChart> {
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
          return {
            name: data.data.screeningsDiagramCollections[0].name,
            type: data.data.screeningsDiagramCollections[0].type,
            axis: screenings['axis'],
          };
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
      return this.getScreeningChart(
        personId,
        instrumentId,
        this.createUtcDate(new Date(currentYear, 0, 1)),
        this.createUtcDate(new Date(currentYear, 11, 31, 23, 59, 59)),
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

  private createUtcDate(date: Date): Date {
    const utc_date = Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds(),
    );
    return new Date(utc_date);
  }

  public paginateScreenings(index: number): string {
    this.index = index;
    return this.screenings[this.index].screeningId;
  }
}
