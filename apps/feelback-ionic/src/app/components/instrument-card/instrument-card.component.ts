import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AbstractComponent } from '../../core/components/abstract.component';
import { Instrument } from '../../models/instrument.model';
import * as Survey from 'survey-angular';
import { LanguageService } from '../../services/language.service';
import { ToastController } from '@ionic/angular';
import { TranslatableError } from '../../core/customErrors/translatableError';

@Component({
  selector: 'feelback-ionic-instrument-card',
  templateUrl: './instrument-card.component.html',
  styleUrls: ['./instrument-card.component.scss'],
})
export class InstrumentCardComponent
  extends AbstractComponent
  implements OnInit {
  @Input() instrument: Instrument;
  availableLocales: string[];
  selectedLanguage: string;
  isoLocaleNames: { code: string; name: string; nativeName: string }[] = [];

  constructor(
    readonly translateService: TranslateService,
    readonly router: Router,
    private languageService: LanguageService,
    private toastController: ToastController,
  ) {
    super();
  }

  ngOnInit() {
    const survey = new Survey.Model(this.instrument.payload);
    this.availableLocales = survey.getUsedLocales();
    try {
      this.isoLocaleNames = this.languageService.getAvailableLanguages(
        this.availableLocales,
      );
    } catch (error) {
      let errorMsg: string;
      if (error instanceof TranslatableError) {
        errorMsg = this.translateService.instant(error.message);
      } else {
        errorMsg = error.message;
      }
      this.toastController
        .create({
          message: errorMsg,
          buttons: [
            {
              side: 'end',
              text: this.translateService.instant('app.general.ok'),
            },
          ],
          duration: 5000,
        })
        .then((toast) => {
          toast.present();
        });
    }

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
