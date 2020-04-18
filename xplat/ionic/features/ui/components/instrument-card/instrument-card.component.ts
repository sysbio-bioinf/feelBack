import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Instrument } from '@cancerlog/core/models/mobile';
import { InstrumentCardBaseComponent } from '@cancerlog/features';
import { TranslateService } from '@ngx-translate/core';
import { ShortenPipe, StripTagsPipe } from 'ngx-pipes';
import * as Survey from 'survey-angular';

@Component({
  selector: 'cancerlog-instrument-card',
  templateUrl: 'instrument-card.component.html',
  providers: [StripTagsPipe, ShortenPipe],
})
export class InstrumentCardComponent extends InstrumentCardBaseComponent
  implements OnInit {
  @Input() instrument: Instrument;
  availableLocales: string[];
  selectedLanguage: string;

  constructor(
    readonly shortenPipe: ShortenPipe,
    readonly stripTags: StripTagsPipe,
    readonly translateService: TranslateService,
    readonly router: Router,
  ) {
    super();
  }

  ngOnInit() {
    const survey = new Survey.Model(this.instrument.payload);
    this.availableLocales = survey.getUsedLocales();

    if (this.availableLocales.includes(this.translateService.currentLang)) {
      this.selectedLanguage = this.translateService.currentLang;
    } else {
      this.selectedLanguage = this.availableLocales[0];
    }
  }

  startInstrument() {
    this.router.navigate(['main', 'surveys', this.instrument.id], {
      replaceUrl: true,
      state: {
        locale: this.selectedLanguage,
      },
    });
  }
}
