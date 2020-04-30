import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ChartSeries } from '../models/ChartSeries';

@Injectable({
  providedIn: 'root'
})
export class ScreeningService {

  constructor() { }

  getScreenings(): Observable<ChartSeries[]> {
    const lineChart = [
      {
        "name": "Ratings",
        "series": [
          {
            "value": 58,
            "name": new Date(2019, 0, 1)
          },
          {
            "value": 72,
            "name": new Date(2019, 0, 8)
          },
          {
            "value": 63,
            "name": new Date(2019, 0, 15)
          },
          {
            "value": 40,
            "name": new Date(2019, 0, 22)
          },
          {
            "value": 65,
            "name": new Date(2019, 1, 1)
          },
          {
            "value": 77,
            "name": new Date(2019, 1, 8)
          },
          {
            "value": 89,
            "name": new Date(2019, 1, 15)
          },
          {
            "value": 95,
            "name": new Date(2019, 1, 22)
          },
          {
            "value": 81,
            "name": new Date(2019, 2, 1)
          },
          {
            "value": 85,
            "name": new Date(2019, 2, 8)
          },
          {
            "value": 71,
            "name": new Date(2019, 2, 15)
          },
          {
            "value": 63,
            "name": new Date(2019, 2, 22)
          },
          {
            "value": 82,
            "name": new Date(2019, 3, 1)
          },
          {
            "value": 86,
            "name": new Date(2019, 3, 8)
          },
          {
            "value": 91,
            "name": new Date(2019, 3, 15)
          },
          {
            "value": 85,
            "name": new Date(2019, 3, 22)
          },
          {
            "value": 70,
            "name": new Date(2019, 4, 1)
          },
          {
            "value": 64,
            "name": new Date(2019, 4, 8)
          },
          {
            "value": 60,
            "name": new Date(2019, 4, 15)
          },
          {
            "value": 58,
            "name": new Date(2019, 4, 22)
          },
          {
            "value": 50,
            "name": new Date(2019, 5, 1)
          },
          {
            "value": 45,
            "name": new Date(2019, 5, 8)
          },
          {
            "value": 53,
            "name": new Date(2019, 5, 15)
          },
          {
            "value": 38,
            "name": new Date(2019, 5, 22)
          },
          {
            "value": 35,
            "name": new Date(2019, 6, 1)
          },
          {
            "value": 37,
            "name": new Date(2019, 6, 8)
          },
          {
            "value": 46,
            "name": new Date(2019, 6, 15)
          },
          {
            "value": 51,
            "name": new Date(2019, 6, 22)
          },
          {
            "value": 56,
            "name": new Date(2019, 7, 1)
          },
          {
            "value": 71,
            "name": new Date(2019, 7, 8)
          },
          {
            "value": 65,
            "name": new Date(2019, 7, 15)
          },
          {
            "value": 59,
            "name": new Date(2019, 7, 22)
          },
          {
            "value": 54,
            "name": new Date(2019, 8, 1)
          },
          {
            "value": 51,
            "name": new Date(2019, 8, 8)
          },
          {
            "value": 59,
            "name": new Date(2019, 8, 15)
          },
          {
            "value": 61,
            "name": new Date(2019, 8, 22)
          },
          {
            "value": 63,
            "name": new Date(2019, 9, 1)
          },
          {
            "value": 71,
            "name": new Date(2019, 9, 8)
          },
          {
            "value": 74,
            "name": new Date(2019, 9, 15)
          },
          {
            "value": 77,
            "name": new Date(2019, 9, 22)
          },
          {
            "value": 81,
            "name": new Date(2019, 10, 1)
          },
          {
            "value": 67,
            "name": new Date(2019, 10, 8)
          },
          {
            "value": 56,
            "name": new Date(2019, 10, 15)
          },
          {
            "value": 71,
            "name": new Date(2019, 10, 22)
          },
          {
            "value": 74,
            "name": new Date(2019, 11, 1)
          },
          {
            "value": 77,
            "name": new Date(2019, 11, 8)
          },
          {
            "value": 72,
            "name": new Date(2019, 11, 15)
          },
          {
            "value": 65,
            "name": new Date(2019, 11, 22)
          },
          {
            "value": 70,
            "name": new Date(2019, 11, 31)
          },
        ]
      }
    ];
    return of(lineChart);
  }

  getRadarChart(): Observable<ChartSeries[]> {
    const radarChart =  [
      {
        "name": "Category",
        "series": [
          {
            "name": "Praktische Probleme",
            "value": 83
          },
          {
            "name": "Familiäre Probleme",
            "value": 51
          },
          {
            "name": "Emotionale Probleme",
            "value": 74
          },
          {
            "name": "Spirituelle / religiöse Probleme",
            "value": 78
          },
          {
            "name": "Körperliche Probleme",
            "value": 42
          }
        ]
      }
    ];
    return of(radarChart);
  }
}
