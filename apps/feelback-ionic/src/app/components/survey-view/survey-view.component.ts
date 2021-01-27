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
import { AlertController, IonContent, ToastController } from '@ionic/angular';
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
import { TranslatableError } from '../../core/customErrors/translatableError';

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
    private toastController: ToastController,
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

      try {
        await this.storageService.writeDataToFile(
          filename + '.json',
          JSON.stringify(survey.data),
        );
      } catch (error) {
        this.toastController
          .create({
            message: this.translatePipe.transform(error.message),
            buttons: [
              {
                side: 'end',
                text: this.translatePipe.transform('app.general.ok'),
              },
            ],
            duration: 5000,
          })
          .then((toast) => {
            toast.present();
          });
      }

      const plainData = survey.getPlainData({ includeEmpty: true });

      let resultText;
      try {
        resultText = this.resultService.generateResultText(
          plainData,
          this.instrument.name,
        );
      } catch (error) {
        let errorMsg: string;
        if (error instanceof TranslatableError) {
          errorMsg = this.translatePipe.transform(error.message);
        } else {
          errorMsg = error.message;
        }
        // TODO: put these 3 toastController calls into a function
        this.toastController
          .create({
            message: errorMsg,
            buttons: [
              {
                side: 'end',
                text: this.translatePipe.transform('app.general.ok'),
              },
            ],
            duration: 5000,
          })
          .then((toast) => {
            toast.present();
          });
      }

      if (resultText) {
        this.printData = resultText;

        try {
          await this.storageService.writeDataToFile(
            filename + '.html',
            resultText,
          );
        } catch (error) {
          this.toastController
            .create({
              message: this.translatePipe.transform(error.message),
              buttons: [
                {
                  side: 'end',
                  text: this.translatePipe.transform('app.general.ok'),
                },
              ],
              duration: 5000,
            })
            .then((toast) => {
              toast.present();
            });
        }
      }

      // now we upload the data to our server
      const screeningInput: CreateScreeningInput = {
        instanceId: uuidv4(),
        collectedAt: new Date(),
        language: this.translateService.currentLang,
        payload: survey.data,
        // TODO: userAgent ??
      };

      const person = this.userService.person;

      try {
        const result = await this.screeningService.uploadScreening(
          screeningInput,
          this.instrument,
          person,
        );
      } catch (error) {
        let errorMsg: string;
        if (error instanceof TranslatableError) {
          errorMsg = this.translatePipe.transform(error.message);
        } else {
          errorMsg = error.message;
        }
        this.toastController
          .create({
            message: errorMsg,
            buttons: [
              {
                side: 'end',
                text: this.translatePipe.transform('app.general.ok'),
              },
            ],
            duration: 5000,
          })
          .then((toast) => {
            toast.present();
          });
      }
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

  async printResult() {
    const printOptions: PrintOptions = {
      duplex: false,
      orientation: 'portrait',
    };
    try {
      await this.printerService.printData(this.printData, printOptions);
    } catch (error) {
      let errorMsg: string;
      if (error instanceof TranslatableError) {
        errorMsg = this.translatePipe.transform(error.message);
      } else {
        errorMsg = error.message;
      }
      // TODO but both ToastController calls within this component into a function to reduce redundant code
      this.toastController
        .create({
          message: errorMsg,
          buttons: [
            {
              side: 'end',
              text: this.translatePipe.transform('app.general.ok'),
            },
          ],
          duration: 5000,
        })
        .then((toast) => {
          toast.present();
        });
    }
  }
}
