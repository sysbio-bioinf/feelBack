import { Injectable } from '@angular/core';
import * as shape from 'd3-shape';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor() {}

  public colors = { primary: '#ce0857', accent: '#f7931e', warn: '#0098a2' };
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
    search: 'search',
  };
}
