import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AbstractComponent } from 'src/app/core/components/abstract.component';
import { Instrument } from 'src/app/models/instrument.model';
import * as Survey from 'survey-angular';

@Component({
  selector: 'feelback-ionic-instrument-card',
  templateUrl: './instrument-card.component.html',
  styleUrls: ['./instrument-card.component.scss'],
})
export class InstrumentCardComponent extends AbstractComponent
  implements OnInit {
  @Input() instrument: Instrument;
  availableLocales: string[];
  selectedLanguage: string;

  constructor(
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
