import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { NgStringPipesModule } from 'ngx-pipes';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { TranslatableError } from '../../core/customErrors/translatableError';
import { ApplicationLanguageModel } from '../../models/application-language.model';
import { LanguageService } from '../../services/language.service';
import { InstrumentCardComponent } from './instrument-card.component';

describe('InstrumentCardComponent', () => {
  let component: InstrumentCardComponent;
  let fixture: ComponentFixture<InstrumentCardComponent>;

  const toastMock = {
    present: jest.fn(() => Promise.resolve()),
  };

  const toastControllerMock = {
    create: jest.fn((any) => Promise.resolve(toastMock)),
  };

  const mockAppLanguages: ApplicationLanguageModel[] = [
    { name: 'English', nativeName: 'English', code: 'en' },
    { name: 'German', nativeName: 'Deutsch', code: 'de' },
  ];

  const languageServiceMock = {
    getAvailableLanguages: jest.fn(() => mockAppLanguages),
  };

  const routerMock = {
    navigate: jest.fn(),
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [InstrumentCardComponent],
        imports: [
          IonicModule.forRoot(),
          TranslateTestingModule.withTranslations({ de: {}, es: {} }),
          FormsModule,
          NgStringPipesModule,
        ],
        providers: [
          { provide: Router, useValue: routerMock },
          { provide: LanguageService, useValue: languageServiceMock },
          { provide: ToastController, useValue: toastControllerMock },
        ],
      }).compileComponents();
    }),
  );

  it('should create', () => {
    fixture = TestBed.createComponent(InstrumentCardComponent);
    component = fixture.componentInstance;
    component.instrument = {
      id: '42',
      description: '',
      name: '',
      type: '',
      payload: { startSurveyText: { default: 'Start', de: 'Starten' } },
      changelog: '',
      image: '',
      rules: [],
    };

    expect(component).toBeTruthy();
  });

  it('should set the correct language for the survey', () => {
    // check if the component has the correct current language
    expect(component.translateService.getDefaultLang()).toEqual('de');
    component.translateService.use('de');
    expect(component.translateService.currentLang).toBe('de');

    component.ngOnInit();

    // the availableLocales should be 'en' (default) and 'de'
    expect(component.availableLocales).toEqual(['en', 'de']);
    // since the currentLang of the App is 'de' and the survey is available in 'de', 'de' should be selected
    expect(component.selectedLanguage).toEqual('de');

    // Set 'es' as current language -> 'es' is not available for the survey -> use availableLocales[0] -> 'en'
    component.translateService.use('es');
    component.ngOnInit();
    expect(component.translateService.currentLang).toBe('es');
    expect(component.selectedLanguage).toEqual('en');
  });

  it('should handle errors', () => {
    let errMsg = 'Serice Error';
    languageServiceMock.getAvailableLanguages.mockImplementationOnce(() => {
      throw new Error(errMsg);
    });
    component.ngOnInit();
    expect(toastControllerMock.create.mock.calls[0][0].message).toBe(errMsg);
    errMsg = 'app.error.msg';
    languageServiceMock.getAvailableLanguages.mockImplementationOnce(() => {
      throw new TranslatableError(errMsg);
    });
    component.ngOnInit();
    expect(toastControllerMock.create.mock.calls[1][0].message).toBe(errMsg);
  });

  it('should navigate to the correct url', () => {
    component.startInstrument();
    expect(routerMock.navigate).toHaveBeenCalledWith(
      ['main', 'surveys', component.instrument.id],
      {
        replaceUrl: true,
        state: {
          locale: component.selectedLanguage,
        },
      },
    );
    expect(component.instrument.id).toEqual('42');
  });
});
