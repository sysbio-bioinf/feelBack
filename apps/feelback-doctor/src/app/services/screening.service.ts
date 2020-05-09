import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ChartSeries } from '../models/ChartSeries';
import { Screening } from '../models/Screening';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ScreeningService {
  constructor() {}

  public getScreenings(): Observable<ChartSeries[]> {
    const lineChart = [
      {
        name: 'Rating',
        series: [
          {
            value: 5,
            name: new Date(2019, 0, 1),
          },
          {
            value: 7,
            name: new Date(2019, 0, 8),
          },
          {
            value: 6,
            name: new Date(2019, 0, 15),
          },
          {
            value: 4,
            name: new Date(2019, 0, 22),
          },
          {
            value: 6,
            name: new Date(2019, 1, 1),
          },
          {
            value: 7,
            name: new Date(2019, 1, 8),
          },
          {
            value: 9,
            name: new Date(2019, 1, 15),
          },
          {
            value: 9,
            name: new Date(2019, 1, 22),
          },
          {
            value: 8,
            name: new Date(2019, 2, 1),
          },
          {
            value: 8,
            name: new Date(2019, 2, 8),
          },
          {
            value: 7,
            name: new Date(2019, 2, 15),
          },
          {
            value: 6,
            name: new Date(2019, 2, 22),
          },
          {
            value: 8,
            name: new Date(2019, 3, 1),
          },
          {
            value: 8,
            name: new Date(2019, 3, 8),
          },
          {
            value: 9,
            name: new Date(2019, 3, 15),
          },
          {
            value: 8,
            name: new Date(2019, 3, 22),
          },
          {
            value: 7,
            name: new Date(2019, 4, 1),
          },
          {
            value: 6,
            name: new Date(2019, 4, 8),
          },
          {
            value: 6,
            name: new Date(2019, 4, 15),
          },
          {
            value: 5,
            name: new Date(2019, 4, 22),
          },
          {
            value: 5,
            name: new Date(2019, 5, 1),
          },
          {
            value: 4,
            name: new Date(2019, 5, 8),
          },
          {
            value: 5,
            name: new Date(2019, 5, 15),
          },
          {
            value: 3,
            name: new Date(2019, 5, 22),
          },
          {
            value: 3,
            name: new Date(2019, 6, 1),
          },
          {
            value: 3,
            name: new Date(2019, 6, 8),
          },
          {
            value: 4,
            name: new Date(2019, 6, 15),
          },
          {
            value: 5,
            name: new Date(2019, 6, 22),
          },
          {
            value: 5,
            name: new Date(2019, 7, 1),
          },
          {
            value: 7,
            name: new Date(2019, 7, 8),
          },
          {
            value: 6,
            name: new Date(2019, 7, 15),
          },
          {
            value: 5,
            name: new Date(2019, 7, 22),
          },
          {
            value: 5,
            name: new Date(2019, 8, 1),
          },
          {
            value: 5,
            name: new Date(2019, 8, 8),
          },
          {
            value: 5,
            name: new Date(2019, 8, 15),
          },
          {
            value: 6,
            name: new Date(2019, 8, 22),
          },
          {
            value: 6,
            name: new Date(2019, 9, 1),
          },
          {
            value: 7,
            name: new Date(2019, 9, 8),
          },
          {
            value: 7,
            name: new Date(2019, 9, 15),
          },
          {
            value: 7,
            name: new Date(2019, 9, 22),
          },
          {
            value: 8,
            name: new Date(2019, 10, 1),
          },
          {
            value: 6,
            name: new Date(2019, 10, 8),
          },
          {
            value: 5,
            name: new Date(2019, 10, 15),
          },
          {
            value: 7,
            name: new Date(2019, 10, 22),
          },
          {
            value: 7,
            name: new Date(2019, 11, 1),
          },
          {
            value: 7,
            name: new Date(2019, 11, 8),
          },
          {
            value: 7,
            name: new Date(2019, 11, 15),
          },
          {
            value: 6,
            name: new Date(2019, 11, 22),
          },
          {
            value: 7,
            name: new Date(2019, 11, 31),
          },
        ],
      },
    ];
    return of(lineChart);
  }

  public getRadarChart(): Observable<ChartSeries[]> {
    const radarChart = [
      {
        name: 'Category',
        series: [
          {
            name: 'Praktische Probleme',
            value: 83,
          },
          {
            name: 'Familiäre Probleme',
            value: 51,
          },
          {
            name: 'Emotionale Probleme',
            value: 74,
          },
          {
            name: 'Spirituelle / religiöse Probleme',
            value: 78,
          },
          {
            name: 'Körperliche Probleme',
            value: 42,
          },
        ],
      },
    ];
    return of(radarChart);
  }
  
  getScreening(date: string): Observable<Screening> {
    const screening = {
      locale: "de",
      instrument: "Distress Thermometer",
      date: date,
      result: {
        "DT01": 5,
        "DT02": "true",
        "PP01": "true",
        "PP02": "true",
        "PP03": "false",
        "PP04": "false",
        "PP05": "true",
        "PP06": "false",
        "PP07": "true",
        "FP01": "1",
        "FP02": "0",
        "EP01": "true",
        "EP02": "false",
        "EP03": "true",
        "EP04": "true",
        "EP05": "true",
        "EP06": "true",
        "SP01": "true",
        "SP02": "true",
        "KP01": "true",
        "KP02": "false",
        "KP03": "true",
        "KP04": "false",
        "KP05": "true",
        "KP06": "true",
        "KP07": "false",
        "KP08": "true",
        "KP09": "false",
        "KP10": "true",
        "KP11": "false",
        "KP12": "true",
        "KP13": "true",
        "KP14": "false",
        "KP15": "false",
        "KP16": "true",
        "KP17": "false",
        "KP18": "true",
        "KP19": "true",
        "KP20": "true",
        "KP21": "false",
        "KP22": "false",
        "KP23": "false",
        "other": "test"
      },
      categories: [
        {
          "name": "Praktische Probleme",
          "positive": 5,
          "total": 8
        },
        {
          "name": "Familiäre Probleme",
          "positive": 1,
          "total": 2
        },
        {
          "name": "Emotionale Probleme",
          "positive": 5,
          "total": 6
        },
        {
          "name": "Spirituelle / religiöse Probleme",
          "positive": 2,
          "total": 2
        },
        {
          "name": "Körperliche Probleme",
          "positive": 13,
          "total": 23
        }
      ],
      comment: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum."
    };
    return of(screening).pipe(delay(500));
  }


}
