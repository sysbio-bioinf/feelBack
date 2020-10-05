import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrintOptions } from '@ionic-native/printer/ngx';
import { AlertController } from '@ionic/angular';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import * as dayjs from 'dayjs';
import { AbstractComponent } from '../../core/components/abstract.component';
import { CreateScreeningInput } from '../../graphql/generated/feelback.graphql';
import { Instrument } from '../../models/instrument.model';
import { ScreeningService } from '../../services/api/screening.service';
import { PrinterService } from '../../services/printer.service';
import { StorageService } from '../../services/storage.service';
import { UserService } from '../../services/user.service';
import * as Survey from 'survey-angular';
import * as widgets from 'surveyjs-widgets';
import { v4 as uuidv4 } from 'uuid';

widgets.nouislider(Survey);

@Component({
  selector: 'feelback-ionic-survey-view',
  templateUrl: './survey-view.component.html',
  styleUrls: ['./survey-view.component.scss'],
})
export class SurveyViewComponent extends AbstractComponent implements OnInit {
  @Input() instrument: Instrument;
  @Input() selectedLanguage: string;
  survey: Survey.Survey;
  printData: string;
  surveyCompleted = false;
  currentFontSize = 1;

  constructor(
    private alertController: AlertController,
    private router: Router,
    private translatePipe: TranslatePipe,
    private translateService: TranslateService,
    private storageService: StorageService,
    private userService: UserService,
    private screeningService: ScreeningService,
    private printerService: PrinterService,
  ) {
    super();
  }

  async ngOnInit() {
    await this.setupInstrumentPage();
    this.translateService.use(
      this.selectedLanguage || this.survey.getUsedLocales[0],
    );
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
    this.surveyCompleted = false;

    this.survey = new Survey.Model(this.instrument.payload);

    this.survey.showTitle = false;
    this.survey.showNavigationButtons = false;
    this.survey.showQuestionNumbers = 'off';
    this.survey.showCompletedPage = false;
    this.survey.showPageNumbers = false;
    this.survey.showProgressBar = 'off';

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
      this.surveyCompleted = true;

      document.getElementById('fontSizeButtons').style.visibility = 'hidden';
      document.getElementById('instrument-pagecount').style.visibility =
        'hidden';

      document.getElementById('instrument-navigation-back').style.visibility =
        'hidden';
      document.getElementById('instrument-navigation-cancel').style.visibility =
        'hidden';
      document.getElementById('instrument-navigation-next').style.visibility =
        'hidden';
      document.getElementById('instrument-navigation-submit').style.visibility =
        'hidden';

      const now = dayjs();
      const filename = now.format('YYYY-MM-DD HH-mm-ss');

      await this.storageService.writeDataToFile(
        filename + '.json',
        JSON.stringify(survey.data),
      );

      const plainData = survey.getPlainData({ includeEmpty: true });

      let resultText = '';

      resultText = resultText + '<div style="font-size: 12px">';

      resultText = resultText + '<h1>' + this.instrument.name + '</h1>';
      resultText =
        resultText +
        `<p>${new Date().toLocaleString(
          this.translateService.currentLang,
        )}</p>`;

      resultText = resultText + `<p>Name: _____________________________</p>`;
      resultText = resultText + `<p>Geburtsdatum: _____________________</p>`;

      resultText = resultText + '<table style="width: 100%; font-size: 1em">';

      let id = 0;

      for (const q of plainData) {
        if (q.name.startsWith('__')) {
          // we skip elements starting with "__" for our html export and print view
          continue;
        }

        const question = q.title;
        let value = q.displayValue;
        if (value === '' || value === null || value === undefined) {
          value = '---';
        }

        id++;
        resultText =
          resultText +
          `<tr>
          <td style="width: 10%; vertical-align: top; border-bottom: 1px solid #7e8c8d;">${id}<td>
          <td style="width: 40%; vertical-align: top; border-bottom: 1px solid #7e8c8d;">${question}<td>
          <td style="width: 50%; vertical-align: top; border-bottom: 1px solid #7e8c8d;">${value}<td>
        </tr>`;
      }

      resultText = resultText + '</table>';
      resultText = resultText + '</div>';

      this.printData = resultText;

      await this.storageService.writeDataToFile(filename + '.html', resultText);

      // now we upload the data to our server
      const screeningInput: CreateScreeningInput = {
        instanceId: uuidv4(),
        collectedAt: new Date(),
        language: this.translateService.currentLang,
        payload: survey.data,
        // TODO: userAgent ??
      };

      const person = this.userService.person;

      const result = await this.screeningService.uploadScreening(
        screeningInput,
        this.instrument,
        person,
      );
    });

    this.survey.onCurrentPageChanged.add(async (survey: Survey.Survey) => {
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
        document.getElementById(
          'instrument-navigation-submit',
        ).style.visibility = 'visible';
      } else {
        document.getElementById('instrument-navigation-next').style.visibility =
          'visible';
        document.getElementById(
          'instrument-navigation-submit',
        ).style.visibility = 'hidden';
      }

      document.getElementById('instrument-navigation-cancel').style.visibility =
        'visible';
    });

    Survey.SurveyNG.render('surveyElement', {
      model: this.survey,
    });
  }

  printResult() {
    const printOptions: PrintOptions = {
      duplex: false,
      orientation: 'portrait',
    };
    this.printerService.printData(this.printData, printOptions);
  }
}
