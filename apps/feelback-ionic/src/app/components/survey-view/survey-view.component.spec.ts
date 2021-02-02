import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { Apollo } from 'apollo-angular';
import { NgPipesModule } from 'ngx-pipes';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { PrinterService } from '../../services/printer.service';
import { StorageService } from '../../services/storage.service';
import { SurveyViewComponent } from './survey-view.component';
import { PrintOptions } from '@ionic-native/printer/ngx';
import { TranslatableError } from '../../core/customErrors/translatableError';

describe('SurveyViewComponent', () => {
  let component: SurveyViewComponent;
  let fixture: ComponentFixture<SurveyViewComponent>;

  const toastMock = {
    present: jest.fn(() => Promise.resolve()),
  };

  const toastControllerMock = {
    create: jest.fn((any) => Promise.resolve(toastMock)),
  };

  const storageServiceSpy = undefined;
  const printerServiceSpy = {
    printData: jest.fn((printData: string, printOptions: PrintOptions) =>
      Promise.resolve(),
    ),
  };
  const translatePipeSpy = {
    transform: jest.fn((key: string) => key),
  };

  const routerMock = {
    navigate: jest.fn(),
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SurveyViewComponent],
        imports: [
          IonicModule.forRoot(),
          TranslateTestingModule.withTranslations({ en: {} }),
          NgPipesModule,
        ],
        providers: [
          Apollo,
          { provide: StorageService, useValue: storageServiceSpy },
          { provide: PrinterService, useValue: printerServiceSpy },
          { provide: Router, useValue: routerMock },
          { provide: TranslatePipe, useValue: translatePipeSpy },
          { provide: ToastController, useValue: toastControllerMock },
        ],
      }).compileComponents();
      fixture = TestBed.createComponent(SurveyViewComponent);
      component = fixture.componentInstance;
      component.instrument = {
        id: '',
        description: '',
        name: '',
        type: '',
        payload: {
          startSurveyText: { default: 'Start', de: 'Starten' },
          pages: [{}, {}, {}],
        },
        changelog: '',
        image: '',
        rules: [],
      };
      component.selectedLanguage = 'en';
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should setup the instrument page and use the correct language', async () => {
    await component.ngOnInit();
    // setup instrument page
    expect(component.surveyCompleted).toBe(false);
    expect(component.survey).toBeDefined();
    expect(component.survey.showTitle).toBe(false);
    expect(component.survey.showNavigationButtons).toEqual('none');
    expect(component.survey.showQuestionNumbers).toEqual('off');
    expect(component.survey.showCompletedPage).toBe(false);
    expect(component.survey.showPageNumbers).toBe(false);
    expect(component.survey.showProgressBar).toEqual('off');
    // survey.local == '' means that 'en' is used (see documentation )
    expect(component.survey.locale).toEqual('');
  });

  it('should check boolean values', async () => {
    await component.setupInstrumentPage();
    expect(component.showNext).toBe(true);
    expect(component.showScaleButtons).toBe(true);
    expect(component.showPrev).toBe(false);
    expect(component.showCancel).toBe(true);
    expect(component.showPageCount).toBe(true);
    expect(component.showSubmit).toBe(false);
    expect(component.showSubmit).toBe(false);
  });

  it('should navigate home', () => {
    component.navigateHome();
    expect(component.router.navigate).toHaveBeenCalledWith(['main', 'home'], {
      replaceUrl: true,
    });
  });

  it('should print the data correctly', () => {
    const printOptionsForComparison: PrintOptions = {
      duplex: false,
      orientation: 'portrait',
    };
    const dummyPrintData = '<html><h1>Dummy PrintData</h1></html>';
    component.printData = dummyPrintData;
    expect(component.printData).toBe(dummyPrintData);
    component.printResult();
    expect(printerServiceSpy.printData).toBeCalledWith(
      dummyPrintData,
      printOptionsForComparison,
    );
  });

  it('should create toasts for errors', async () => {
    let errMsg = 'Service Error';
    let err = new Error(errMsg);
    await component.createErrorToast(err);
    expect(toastControllerMock.create).toBeCalled();
    expect(toastControllerMock.create.mock.calls.pop()[0].message).toBe(errMsg);
    errMsg = 'app.error.msg';
    err = new TranslatableError(errMsg);
    await component.createErrorToast(err);
    expect(toastControllerMock.create.mock.calls.pop()[0].message).toBe(errMsg);
    await component.createErrorToast('noError');
    expect(toastControllerMock.create.mock.calls.pop()[0].message).toBe(
      'Find me in survey-view component',
    );
    errMsg = 'PrintError';
    printerServiceSpy.printData.mockImplementationOnce(
      (printData: 'data', printOptions: {}) => {
        throw new Error(errMsg);
      },
    );
    await component.printResult();
    expect(toastControllerMock.create.mock.calls.pop()[0].message).toBe(errMsg);
  });
});
