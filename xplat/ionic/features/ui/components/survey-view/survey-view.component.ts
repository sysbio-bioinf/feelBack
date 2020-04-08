import { Component, Input, OnInit } from '@angular/core';
import { Instrument } from '@cancerlog/core/models/mobile/instrument.model';
import { SurveyViewBaseComponent } from '@cancerlog/features';
import * as Survey from 'survey-angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'cancerlog-survey-view',
  templateUrl: 'survey-view.component.html',
})
export class SurveyViewComponent extends SurveyViewBaseComponent
  implements OnInit {
  @Input() instrument: Instrument;
  survey: Survey.Survey;

  constructor(
    private alertController: AlertController,
    private router: Router,
  ) {
    super();
  }

  async ngOnInit() {
    await this.setupInstrumentPage();
  }

  async cancelSurvey() {
    const alert = await this.alertController.create({
      header: 'Abbrechen?',
      message: 'Wollen Sie die Bearbeitung des Fragebogens wirklich abbrechen?',
      cssClass: 'alertDialog',
      buttons: [
        {
          text: 'Nein',
          cssClass: 'success',
          handler: () => {
            // do nothing, because the user wants to work on the questionnaire
          },
        },
        {
          text: 'Ja',
          cssClass: 'cancel',
          handler: () => {
            this.router.navigate(['main', 'home']);
          },
        },
      ],
    });

    await alert.present();
  }

  async setupInstrumentPage() {
    this.survey = new Survey.Model(this.instrument.payload);

    this.survey.showTitle = false;
    this.survey.showNavigationButtons = false;
    this.survey.showQuestionNumbers = 'off';
    this.survey.showCompletedPage = false;
    this.survey.showPageNumbers = false;
    this.survey.showProgressBar = 'top';

    const feelbackColorScheme = Survey.StylesManager.ThemeColors['default'];

    feelbackColorScheme['$header-background-color'] =
      'var(--ion-color-primary)';
    feelbackColorScheme['$body-container-background-color'] = '#ffffff';

    feelbackColorScheme['$main-color'] = 'var(--ion-color-primary)';
    feelbackColorScheme['$main-hover-color'] = 'var(--ion-color-primary)';
    feelbackColorScheme['$text-color'] = '#737373';
    feelbackColorScheme['$header-color'] = 'var(--ion-color-primary)';
    feelbackColorScheme['$border-color'] = 'var(--ion-color-primary)';

    feelbackColorScheme['$progress-text-color'] = '#ffffff';

    Survey.StylesManager.applyTheme();

    // ------------------------------------------
    // calculate the navigation buttons
    if (this.survey.pageCount === 1) {
      document.getElementById('instrument-navigation-submit').style.visibility =
        'visible';
    }

    if (this.survey.pageCount > 1) {
      document.getElementById('instrument-navigation-next').style.visibility =
        'visible';
    }

    document.getElementById('instrument-navigation-cancel').style.visibility =
      'visible';
    // ------------------------------------------

    Survey.SurveyNG.render('surveyElement', {
      model: this.survey,
      onCurrentPageChanged: this.surveyPageChanged,
      // onComplete: this.surveyOnComplete,
    });
  }

  private surveyPageChanged(survey: Survey.Survey) {
    if (survey.isFirstPage === true) {
      document.getElementById('instrument-navigation-back').style.visibility =
        'hidden';
    } else {
      document.getElementById('instrument-navigation-back').style.visibility =
        'visible';
    }

    if (survey.isLastPage === true) {
      document.getElementById('instrument-navigation-next').style.visibility =
        'hidden';
      document.getElementById('instrument-navigation-submit').style.visibility =
        'visible';
    } else {
      document.getElementById('instrument-navigation-next').style.visibility =
        'visible';
      document.getElementById('instrument-navigation-submit').style.visibility =
        'hidden';
    }

    document.getElementById('instrument-navigation-cancel').style.visibility =
      'visible';
  }
}
