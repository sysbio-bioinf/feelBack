import { BaseComponent } from '@cancerlog/core';
import { Instrument } from '@cancerlog/core/models/mobile/instrument.model';
import { Input } from '@angular/core';

export abstract class InstrumentCardBaseComponent extends BaseComponent {
  @Input() instrument: Instrument;

  constructor() {
    super();
  }
}
