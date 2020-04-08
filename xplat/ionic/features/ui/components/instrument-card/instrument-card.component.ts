import { Component } from '@angular/core';
import { InstrumentCardBaseComponent } from '@cancerlog/features';
import { ShortenPipe, StripTagsPipe } from 'ngx-pipes';

@Component({
  selector: 'cancerlog-instrument-card',
  templateUrl: 'instrument-card.component.html',
  providers: [StripTagsPipe, ShortenPipe],
})
export class InstrumentCardComponent extends InstrumentCardBaseComponent {
  constructor(
    readonly shortenPipe: ShortenPipe,
    readonly stripTags: StripTagsPipe,
  ) {
    super();
  }
}
