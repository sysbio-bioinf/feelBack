import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
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
export class SurveyViewComponent
  extends AbstractComponent
  implements OnInit, OnDestroy {
  @Input() instrument: Instrument;
  @Input() selectedLanguage: string;

  @Output() hideButtonsEvent = new EventEmitter<boolean>();

  @ViewChild('surveyIonContent') ionContentRef: IonContent;

  survey: Survey.Survey;
  printData: string;
  surveyCompleted = false;

  showPrev = false;
  showNext = false;
  showCancel = true;
  showSubmit = false;
  showPageCount = true;
  showScaleButtons = true;

  appLanguage = '';

  constructor(
    private alertController: AlertController,
    readonly router: Router,
    private translatePipe: TranslatePipe,
    private translateService: TranslateService,
    private storageService: StorageService,
    private userService: UserService,
    private screeningService: ScreeningService,
    private printerService: PrinterService,
    private resultService: ResultService,
  ) {
    super();
  }

  async ngOnInit() {
    // save the app language in this variable before rendering the survey
    this.appLanguage = this.translateService.currentLang;
    await this.setupInstrumentPage();
    this.translateService.use(
      this.selectedLanguage || this.survey.getUsedLocales[0],
    );
  }

  ngOnDestroy() {
    // after the survey is destroyed (completed or cancelled),
    // the app language is set back to the saved value
    this.translateService.use(this.appLanguage);
  }

  nextPageScrollTop() {
    if (this.survey.nextPage()) {
      this.ionContentRef.scrollToTop(700);
    }
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
    if (this.survey.pageCount === 1) {
      this.showSubmit = true;
    }

    if (this.survey.pageCount > 1) {
      this.showNext = true;
    }
    // ------------------------------------------

    this.survey.onComplete.add(async (survey: Survey.Survey) => {
      this.surveyCompleted = true;

      this.showScaleButtons = false;
      this.showPageCount = false;
      this.showPrev = false;
      this.showCancel = false;
      this.showNext = false;
      this.showSubmit = false;

      this.hideButtonsEvent.emit(true);

      // test survey
      if (this.instrument.name === 'UI-Test-Dummy-Survey') {
        return;
      }

      const now = dayjs();
      const filename = now.format('YYYY-MM-DD HH-mm-ss');

      await this.storageService.writeDataToFile(
        filename + '.json',
        JSON.stringify(survey.data),
      );

      const plainData = survey.getPlainData({ includeEmpty: true });

      const resultText = this.resultService.generateResultText(
        plainData,
        this.instrument.name,
      );

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

    // ------------------------------------------------------------
    // onCurrentPageChanged
    this.survey.onCurrentPageChanged.add(async (survey: Survey.Survey) => {
      if (survey.isFirstPage === true) {
        this.showPrev = false;
      } else {
        this.showPrev = true;
      }

      if (survey.isLastPage === true) {
        this.showNext = false;
        this.showSubmit = true;
      } else {
        this.showNext = true;
        this.showSubmit = false;
      }
    });
    // -------------------------------------------------------------

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
