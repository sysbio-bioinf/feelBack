import { Injectable } from '@angular/core';
import * as shape from 'd3-shape';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private datePipe: DatePipe) {}

  public colors = { primary: '#00a3ff', accent: '#54b37b', warn: '#f44336' };
  public xAxisTicks: Array<Date> = [
    new Date(2019, 0, 1),
    new Date(2019, 1, 1),
    new Date(2019, 2, 1),
    new Date(2019, 3, 1),
    new Date(2019, 4, 1),
    new Date(2019, 5, 1),
    new Date(2019, 6, 1),
    new Date(2019, 7, 1),
    new Date(2019, 8, 1),
    new Date(2019, 9, 1),
    new Date(2019, 10, 1),
    new Date(2019, 11, 1),
    new Date(2020, 0, 1),
  ];
  public colorScheme: {} = { domain: [this.colors.primary] };
  public curveStepAfter: any = shape.curveStepAfter;
  public curveLinear: any = shape.curveLinearClosed;
  public icons = {
    patient: 'face',
    organization: 'business',
    consultation: 'people',
    rating: 'star',
    instrument: 'event_note',
    screening: 'filter',
    check: 'done',
    uncheck: 'close',
    print: 'print',
    action: 'play_circle_outline',
    copy: 'file_copy',
    download: 'save_alt',
    result: 'image_search'
  };

  public transformDate(date: Date) {
    return this.datePipe.transform(date, 'dd.MM.yyyy');
  }
}
