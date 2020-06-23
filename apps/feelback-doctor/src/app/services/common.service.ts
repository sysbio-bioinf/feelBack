import { Injectable } from '@angular/core';
import * as shape from 'd3-shape';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private datePipe: DatePipe) {}

  public colors = { primary: '#00a3ff', accent: '#54b37b', warn: '#f44336' };
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
    result: 'image_search',
    search: 'search'
  };

}
