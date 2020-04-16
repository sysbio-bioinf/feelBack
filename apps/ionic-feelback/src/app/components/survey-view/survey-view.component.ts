import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Instrument } from '@cancerlog/core/models/mobile';
import { SurveyViewBaseComponent } from '@cancerlog/features';
import { AlertController } from '@ionic/angular';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import * as Survey from 'survey-angular';
import { uuid } from 'uuidv4';
import { StorageService } from '@cancerlog/ionic/core/services';
import { UserService } from '../../services/user.service';
import { ScreeningService } from '../../services/api/screening.service';
import { CreateScreeningInput } from '../../graphql/generated/feelback.graphql';

@Component({
  selector: 'cancerlog-survey-view',
  templateUrl: 'survey-view.component.html',
  providers: [TranslatePipe],
})
export class SurveyViewComponent extends SurveyViewBaseComponent
  implements OnInit {
  @Input() instrument: Instrument;
  @Input() selectedLanguage: string;
  survey: Survey.Survey;
  printData: string;

  constructor(
    private alertController: AlertController,
    private router: Router,
    private translatePipe: TranslatePipe,
    private translateService: TranslateService,
    private storageService: StorageService,
    private userService: UserService,
    private screeningService: ScreeningService,
  ) {
    super();
  }

  async ngOnInit() {
    await this.setupInstrumentPage();
  }

  navigateHome() {
    this.router.navigate(['main', 'home'], { replaceUrl: true });
  }

  async cancelSurvey() {
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

  async setupInstrumentPage() {
    this.survey = new Survey.Model(this.instrument.payload);

    this.survey.showTitle = false;
    this.survey.showNavigationButtons = false;
    this.survey.showQuestionNumbers = 'off';
    this.survey.showCompletedPage = false;
    this.survey.showPageNumbers = false;
    this.survey.showProgressBar = 'top';

    this.survey.locale = this.selectedLanguage || this.survey.getUsedLocales[0];

    // ------------------------------------------
    // Color scheme
    const feelbackColorScheme = Survey.StylesManager.ThemeColors.default;

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

    // ------------------------------------------
    // calculate the navigation buttons
    document.getElementById('instrument-navigation-back').style.visibility =
      'hidden';
    document.getElementById('instrument-navigation-cancel').style.visibility =
      'hidden';
    document.getElementById('instrument-navigation-next').style.visibility =
      'hidden';
    document.getElementById('instrument-navigation-submit').style.visibility =
      'hidden';
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

    this.survey.onComplete.add(async (survey: Survey.Survey) => {
      const filename = new Date().toISOString();
      await this.storageService.writeDataToFile(
        filename + '.json',
        JSON.stringify(survey.data),
      );

      const plainData = survey.getPlainData({ includeEmpty: true });

      let resultText = '';

      resultText = resultText + '<h1>' + this.instrument.name + '</h1>';
      resultText =
        resultText +
        `<p>${new Date().toLocaleString(
          this.translateService.currentLang,
        )}</p>`;
      resultText = resultText + '<table>';

      let id = 0;

      for (const q of plainData) {
        id++;
        resultText =
          resultText +
          `<tr>
          <td>${id}<td>
          <td>${q.name}<td>
          <td>${q.title}<td>
          <td>${q.displayValue} (${q.value})<td>
        </tr>`;
      }

      resultText = resultText + '</table>';
      this.printData = resultText;

      await this.storageService.writeDataToFile(filename + '.html', resultText);

      // now we upload the data to our server
      const screeningInput: CreateScreeningInput = {
        instanceId: uuid(),
        collectedAt: new Date(),
        language: 'de', // TODO get from survey.locale
        payload: survey.data,
        // TODO: userAgent ??
      };
      const person = this.userService.person;

      const result = await this.screeningService.uploadScreening(
        screeningInput,
        person,
        this.instrument,
      );
    });

    Survey.SurveyNG.render('surveyElement', {
      model: this.survey,
      onCurrentPageChanged: this.surveyPageChanged,
      onComplete: this.surveyOnComplete,
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

  private async surveyOnComplete(survey: Survey.Survey) {
    document.getElementById('instrument-navigation-back').style.visibility =
      'hidden';
    document.getElementById('instrument-navigation-cancel').style.visibility =
      'hidden';
    document.getElementById('instrument-navigation-next').style.visibility =
      'hidden';
    document.getElementById('instrument-navigation-submit').style.visibility =
      'hidden';

    document.getElementById('printButton').style.visibility = 'visible';
    document.getElementById('navigateHome').style.visibility = 'visible';
  }
}
