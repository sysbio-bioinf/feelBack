import { Component, Input } from '@angular/core';
import { InstrumentCardBaseComponent } from '@cancerlog/features';
import { ShortenPipe, StripTagsPipe } from 'ngx-pipes';
import { Instrument } from '@cancerlog/core/models/mobile';

@Component({
  selector: 'cancerlog-instrument-card',
  templateUrl: 'instrument-card.component.html',
  providers: [StripTagsPipe, ShortenPipe],
})
export class InstrumentCardComponent extends InstrumentCardBaseComponent {
  @Input() instrument: Instrument;

  constructor(
    readonly shortenPipe: ShortenPipe,
    readonly stripTags: StripTagsPipe,
  ) {
    super();
  }
}
