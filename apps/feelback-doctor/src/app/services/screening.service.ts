import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ChartSeries } from '../models/ChartSeries';
import { Screening } from '../models/Screening';
import { delay, map } from 'rxjs/operators';
import { GetScreeningsForPersonAndInstrumentGQL } from '../graphql/generated/feelback.graphql';
import { EvaluationResult } from '../models/EvaluationResult';

@Injectable({
  providedIn: 'root',
})
export class ScreeningService {
  constructor(
    private screeningService: GetScreeningsForPersonAndInstrumentGQL,
  ) {}

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

  public getScreening(id: string): Observable<any> {
    const screening = {
      locale: 'de',
      instrument: 'Distress Thermometer',
      date: this.getDateForScreening(id),
      payload: {
        DT01: 6,
        DT02: 'false',
        PP01: 'true',
        PP02: 'true',
        PP03: 'false',
        PP04: 'false',
        PP05: 'true',
        PP06: 'false',
        PP07: 'true',
        FP01: 'true',
        FP02: 'false',
        EP01: 'true',
        EP02: 'false',
        EP03: 'true',
        EP04: 'true',
        EP05: 'true',
        EP06: 'true',
        SP01: 'true',
        SP02: 'true',
        KP01: 'true',
        KP02: 'false',
        KP03: 'true',
        KP04: 'false',
        KP05: 'true',
        KP06: 'true',
        KP07: 'false',
        KP08: 'true',
        KP09: 'false',
        KP10: 'true',
        KP11: 'false',
        KP12: 'true',
        KP13: 'true',
        KP14: 'false',
        KP15: 'false',
        KP16: 'true',
        KP17: 'false',
        KP18: 'true',
        KP19: 'true',
        KP20: 'true',
        KP21: 'false',
        KP22: 'false',
        KP23: 'false',
        other: 'test',
      },
      evaluationResult: [],
      comment:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
    };

    return this.screeningService.fetch().pipe(
      map((data) => {
        const evaluationResult = data.data.screeningsForPersonAndInstrument.edges[0].node.evaluationResult;
        if(evaluationResult){
          screening.evaluationResult = evaluationResult;
        }
        return screening;
      }),
    );
  }

  private getDateForScreening(id: string): Date {
    for (const screening of this.screenings[0].series) {
      if (screening.id === id) {
        return screening.name;
      }
    }
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
