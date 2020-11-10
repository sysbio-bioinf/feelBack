import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ApplicationLanguageModel } from '../../models/application-language.model';
import { Router } from '@angular/router';
import { AlertController, IonSelect } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'feelback-ionic-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [TranslatePipe],
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  @Input() showNavButton = false;
  @Input() showBackButton = false;
  @Input() showSwitchLanguageButton = false;
  @Input() showCancelSurveyButton = false;
  @Input() showFontScaleButtons = false;

  @ViewChild('languageSelect') languageSelectRef: IonSelect;

  currentLanguage: string;

  availableLanguages: ApplicationLanguageModel[];

  currentFontSize = 1;

  constructor(
    private languageService: LanguageService,
    private alertController: AlertController,
    private translatePipe: TranslatePipe,
    private router: Router,
  ) {}

  ngOnInit() {
    this.currentLanguage = this.languageService.getCurrentLanguage();
    this.availableLanguages = this.languageService.getAvailableLanguages();
  }

  switchLanguage(event: CustomEvent) {
    this.languageService.switchLanguage(event.detail.value);
    this.currentLanguage = this.languageService.getCurrentLanguage();
  }

  displayLanguageDialog() {
    this.languageSelectRef.open();
  }

  async displayCancelDialog() {
    const alert = await this.alertController.create({
      header: this.translatePipe.transform(
        'app.dialogs.cancelQuestionnaire.title',
      ),
      message: this.translatePipe.transform(
        'app.dialogs.cancelQuestionnaire.text',
      ),
      cssClass: 'alertDialog',
      buttons: [
        {
          text: this.translatePipe.transform('app.general.no'),
          cssClass: 'success',
          handler: () => {
            // do nothing, because the user wants to work on the questionnaire
          },
        },
        {
          text: this.translatePipe.transform('app.general.yes'),
          cssClass: 'danger',
          handler: () => {
            this.router.navigate(['main', 'home'], { replaceUrl: true });
          },
        },
      ],
    });

    await alert.present();
  }

  changeFontSize(delta: number) {
    let newValue = this.currentFontSize + delta;
    newValue = +newValue.toFixed(2);

    if (newValue >= 0.5 && newValue <= 1.5) {
      this.currentFontSize = newValue;

      const surveyHtmlRoot: HTMLElement = document.getElementsByClassName(
        'sv_main',
      )[0] as HTMLElement;
      if (surveyHtmlRoot != null) {
        surveyHtmlRoot.style.fontSize = newValue + 'em';
      }
    }
  }
}
