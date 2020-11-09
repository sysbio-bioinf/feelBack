import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PrintOptions } from '@ionic-native/printer/ngx';
import { AlertController, IonContent } from '@ionic/angular';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import * as dayjs from 'dayjs';
import { AbstractComponent } from '../../core/components/abstract.component';
import { CreateScreeningInput } from '../../graphql/generated/feelback.graphql';
import { Instrument } from '../../models/instrument.model';
import { ScreeningService } from '../../services/api/screening.service';
import { PrinterService } from '../../services/printer.service';
import { StorageService } from '../../services/storage.service';
import { ResultService } from '../../services/result.service';
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

  @ViewChild('surveyIonContent') ionContentRef: IonContent;

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
    private resultService: ResultService
  ) {
    super();
  }

  async ngOnInit() {
    await this.setupInstrumentPage();
    this.translateService.use(
      this.selectedLanguage || this.survey.getUsedLocales[0],
    );
  }

  nextPageScrollTop() {
    this.survey.nextPage();
    this.ionContentRef.scrollToTop(700);
  }

  prevPageScrollTop() {
    this.survey.prevPage();
    this.ionContentRef.scrollToTop(700);
  }

  navigateHome() {
    this.router.navigate(['main', 'home'], { replaceUrl: true });
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

      const resultText = this.resultService.generateResultText(plainData, this.instrument.name)

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
