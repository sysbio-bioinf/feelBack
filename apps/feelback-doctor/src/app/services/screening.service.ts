import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ChartSeries } from '../models/ChartSeries';
import { delay, map } from 'rxjs/operators';
import { GetScreeningGQL, Screening } from '../graphql/generated/feelback.graphql';

@Injectable({
  providedIn: 'root',
})
export class ScreeningService {
  constructor(private screeningService: GetScreeningGQL) {}

  private screenings: ChartSeries[] = [
    {
      name: 'Rating',
      series: [
        {
          value: 5,
          name: new Date(2019, 0, 1),
          id: 'c10237f6-c5de-4cdf-84bc-b62b859b5ea1',
        },
        {
          value: 7,
          name: new Date(2019, 0, 8),
          id: 'c10237f6-c5de-4cdf-84bc-b62b859b5ea2',
        },
        {
          value: 6,
          name: new Date(2019, 0, 15),
          id: 'c10237f6-c5de-4cdf-84bc-b62b859b5ea3',
        },
        {
          value: 4,
          name: new Date(2019, 0, 22),
          id: 'c10237f6-c5de-4cdf-84bc-b62b859b5ea4',
        },
        {
          value: 6,
          name: new Date(2019, 1, 1),
          id: 'c10237f6-c5de-4cdf-84bc-b62b859b5ea5',
        },
        {
          value: 7,
          name: new Date(2019, 1, 8),
          id: 'c10237f6-c5de-4cdf-84bc-b62b859b5ea6',
        },
        {
          value: 9,
          name: new Date(2019, 1, 15),
          id: 'c10237f6-c5de-4cdf-84bc-b62b859b5ea7',
        },
        {
          value: 9,
          name: new Date(2019, 1, 22),
          id: 'c10237f6-c5de-4cdf-84bc-b62b859b5ea8',
        },
        {
          value: 8,
          name: new Date(2019, 2, 1),
          id: 'c10237f6-c5de-4cdf-84bc-b62b859b5ea9',
        },
        {
          value: 8,
          name: new Date(2019, 2, 8),
          id: 'c10237f6-c5de-4cdf-84bc-b62b859b5eb1',
        },
        {
          value: 7,
          name: new Date(2019, 2, 15),
          id: 'c10237f6-c5de-4cdf-84bc-b62b859b5eb2',
        },
        {
          value: 6,
          name: new Date(2019, 2, 22),
          id: 'c10237f6-c5de-4cdf-84bc-b62b859b5eb3',
        },
        {
          value: 8,
          name: new Date(2019, 3, 1),
          id: 'c10237f6-c5de-4cdf-84bc-b62b859b5eb4',
        },
        {
          value: 8,
          name: new Date(2019, 3, 8),
          id: 'c10237f6-c5de-4cdf-84bc-b62b859b5eb5',
        },
        {
          value: 9,
          name: new Date(2019, 3, 15),
          id: 'c10237f6-c5de-4cdf-84bc-b62b859b5eb6',
        },
        {
          value: 8,
          name: new Date(2019, 3, 22),
          id: 'c10237f6-c5de-4cdf-84bc-b62b859b5eb7',
        },
        {
          value: 7,
          name: new Date(2019, 4, 1),
          id: 'c10237f6-c5de-4cdf-84bc-b62b859b5eb8',
        },
        {
          value: 6,
          name: new Date(2019, 4, 8),
          id: 'c10237f6-c5de-4cdf-84bc-b62b859b5eb9',
        },
        {
          value: 6,
          name: new Date(2019, 4, 15),
          id: 'c10237f6-c5de-4cdf-84bc-b62b859b5ec1',
        },
        {
          value: 5,
          name: new Date(2019, 4, 22),
          id: 'c10237f6-c5de-4cdf-84bc-b62b859b5ec2',
        },
        {
          value: 5,
          name: new Date(2019, 5, 1),
          id: 'c10237f6-c5de-4cdf-84bc-b62b859b5ec3',
        },
        {
          value: 4,
          name: new Date(2019, 5, 8),
          id: 'c10237f6-c5de-4cdf-84bc-b62b859b5ec4',
        },
        {
          value: 5,
          name: new Date(2019, 5, 15),
          id: 'c10237f6-c5de-4cdf-84bc-b62b859b5ec5',
        },
        {
          value: 3,
          name: new Date(2019, 5, 22),
          id: 'c10237f6-c5de-4cdf-84bc-b62b859b5ec6',
        },
        {
          value: 3,
          name: new Date(2019, 6, 1),
          id: 'c10237f6-c5de-4cdf-84bc-b62b859b5ec7',
        },
        {
          value: 3,
          name: new Date(2019, 6, 8),
          id: 'c10237f6-c5de-4cdf-84bc-b62b859b5ec8',
        },
        {
          value: 4,
          name: new Date(2019, 6, 15),
          id: 'c10237f6-c5de-4cdf-84bc-b62b859b5ec9',
        },
        {
          value: 5,
          name: new Date(2019, 6, 22),
          id: 'c10237f6-c5de-4cdf-84bc-b62b859b5ed1',
        },
        {
          value: 5,
          name: new Date(2019, 7, 1),
          id: 'c10237f6-c5de-4cdf-84bc-b62b859b5ed2',
        },
        {
          value: 7,
          name: new Date(2019, 7, 8),
          id: 'c10237f6-c5de-4cdf-84bc-b62b859b5ed3',
        },
        {
          value: 6,
          name: new Date(2019, 7, 15),
          id: 'c10237f6-c5de-4cdf-84bc-b62b859b5ed4',
        },
        {
          value: 5,
          name: new Date(2019, 7, 22),
          id: 'c10237f6-c5de-4cdf-84bc-b62b859b5ed5',
        },
        {
          value: 5,
          name: new Date(2019, 8, 1),
          id: 'c10237f6-c5de-4cdf-84bc-b62b859b5ed6',
        },
        {
          value: 5,
          name: new Date(2019, 8, 8),
          id: 'c10237f6-c5de-4cdf-84bc-b62b859b5ed7',
        },
        {
          value: 5,
          name: new Date(2019, 8, 15),
          id: 'c10237f6-c5de-4cdf-84bc-b62b859b5ed8',
        },
        {
          value: 6,
          name: new Date(2019, 8, 22),
          id: 'c10237f6-c5de-4cdf-84bc-b62b859b5ed9',
        },
        {
          value: 6,
          name: new Date(2019, 9, 1),
          id: 'c10237f6-c5de-4cdf-84bc-b62b859b5ee1',
        },
        {
          value: 7,
          name: new Date(2019, 9, 8),
          id: 'c10237f6-c5de-4cdf-84bc-b62b859b5ee2',
        },
        {
          value: 7,
          name: new Date(2019, 9, 15),
          id: 'c10237f6-c5de-4cdf-84bc-b62b859b5ee3',
        },
        {
          value: 7,
          name: new Date(2019, 9, 22),
          id: 'c10237f6-c5de-4cdf-84bc-b62b859b5ee4',
        },
        {
          value: 8,
          name: new Date(2019, 10, 1),
          id: 'c10237f6-c5de-4cdf-84bc-b62b859b5ee5',
        },
        {
          value: 6,
          name: new Date(2019, 10, 8),
          id: 'c10237f6-c5de-4cdf-84bc-b62b859b5ee6',
        },
        {
          value: 5,
          name: new Date(2019, 10, 15),
          id: 'c10237f6-c5de-4cdf-84bc-b62b859b5ee7',
        },
        {
          value: 7,
          name: new Date(2019, 10, 22),
          id: 'c10237f6-c5de-4cdf-84bc-b62b859b5ee8',
        },
        {
          value: 7,
          name: new Date(2019, 11, 1),
          id: 'c10237f6-c5de-4cdf-84bc-b62b859b5ee9',
        },
        {
          value: 7,
          name: new Date(2019, 11, 8),
          id: 'c10237f6-c5de-4cdf-84bc-b62b859b5ef1',
        },
        {
          value: 7,
          name: new Date(2019, 11, 15),
          id: 'c10237f6-c5de-4cdf-84bc-b62b859b5ef2',
        },
        {
          value: 6,
          name: new Date(2019, 11, 22),
          id: 'c10237f6-c5de-4cdf-84bc-b62b859b5ef3',
        },
        {
          value: 7,
          name: new Date(2019, 11, 31),
          id: 'c10237f6-c5de-4cdf-84bc-b62b859b5ef4',
        },
      ],
    },
  ];

  public getScreenings(): Observable<ChartSeries[]> {
    return of(this.screenings).pipe(delay(400));
  }

  public getScreening(id: string): Observable<Screening> {
    return this.screeningService
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
    for (const screening of this.screenings[0].series) {
      if (screening.id === id) {
        return true;
      }
    }
    return false;
  }
}
