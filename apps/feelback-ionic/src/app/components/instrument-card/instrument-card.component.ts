import { Component, Input, OnInit } from '@angular/core';
import { ShortenPipe, StripTagsPipe } from 'ngx-pipes';
import * as Survey from 'survey-angular';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AbstractComponent } from 'src/app/core/components/abstract.component';
import { Instrument } from 'src/app/models/instrument.model';

@Component({
  selector: 'feelback-instrument-card',
  templateUrl: './instrument-card.component.html',
  styleUrls: ['./instrument-card.component.scss'],
  providers: [StripTagsPipe, ShortenPipe],
})
export class InstrumentCardComponent extends AbstractComponent
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
