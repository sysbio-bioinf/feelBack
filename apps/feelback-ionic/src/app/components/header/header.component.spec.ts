import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertController, IonicModule, ToastController } from '@ionic/angular';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { TranslatableError } from '../../core/customErrors/translatableError';
import { ApplicationLanguageModel } from '../../models/application-language.model';
import { LanguageService } from '../../services/language.service';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  const mockLanguageEn = 'en';
  const mockLanguageDe = 'de';
  let currentLanguage = 'en';

  const mockEvent = new CustomEvent('mock', { detail: { value: 'de' } });

  const mockAppLanguages: ApplicationLanguageModel[] = [
    { name: 'English', nativeName: 'English', code: 'en' },
    { name: 'German', nativeName: 'Deutsch', code: 'de' },
  ];

  const toastMock = {
    present: jest.fn(() => Promise.resolve()),
  };

  const toastControllerMock = {
    create: jest.fn((any) => Promise.resolve(toastMock)),
  };

  const alertMock = {
    present: jest.fn(() => Promise.resolve()),
  };

  const alertControllerMock = {
    create: jest.fn((any) => Promise.resolve(alertMock)),
  };

  const languageServiceMock = {
    currentLanguage: '',
    getCurrentLanguage: jest.fn(() => currentLanguage),
    getAvailableLanguages: jest.fn(() => mockAppLanguages),
    switchLanguage: jest.fn((newLanguage: string) => {
      currentLanguage = newLanguage;
    }),
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [HeaderComponent],
        imports: [
          IonicModule,
          TranslateTestingModule.withTranslations('en', {}),
          RouterTestingModule,
        ],
        providers: [
          { provide: LanguageService, useValue: languageServiceMock },
          { provide: ToastController, useValue: toastControllerMock },
          { provide: AlertController, useValue: alertControllerMock },
        ],
      }).compileComponents();
      fixture = TestBed.createComponent(HeaderComponent);
      component = fixture.componentInstance;
    }),
  );

  it('should create', async () => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
  });

  it('should set values on init', async () => {
    await component.ngOnInit();
    expect(languageServiceMock.getCurrentLanguage).toBeCalled();
    expect(languageServiceMock.getAvailableLanguages).toBeCalled();
    expect(component.currentLanguage).toBe(mockLanguageEn);
    expect(component.availableLanguages).toBe(mockAppLanguages);
    // Test Error cases
    let errMsg = 'Service Error';
    languageServiceMock.getAvailableLanguages.mockImplementationOnce(() => {
      throw new Error(errMsg);
    });
    await component.ngOnInit();
    expect(toastControllerMock.create).toBeCalled();
    expect(toastControllerMock.create.mock.calls[0][0].message).toBe(errMsg);
    errMsg = 'app.error.msg';
    languageServiceMock.getAvailableLanguages.mockImplementationOnce(() => {
      throw new TranslatableError(errMsg);
    });
    await component.ngOnInit();
    expect(toastControllerMock.create.mock.calls[1][0].message).toBe(errMsg);
  });

  it('should be able to change the language', () => {
    expect(currentLanguage).toBe(mockLanguageEn);
    component.switchLanguage(mockEvent);
    expect(currentLanguage).toBe(mockLanguageDe);
  });

  it('should be able to open the language dialog', () => {
    component.showSwitchLanguageButton = true;
    const displayLanguageDialogMock = jest
      .spyOn(component, 'displayLanguageDialog')
      .mockImplementation();
    fixture.detectChanges();
    const ionButtonDisplayLanguage: HTMLElement = fixture.debugElement.nativeElement.querySelector(
      'ion-button[data-cy="header-language-actual-button"]',
    );
    ionButtonDisplayLanguage.click();
    expect(displayLanguageDialogMock).toHaveBeenCalled();
  });

  it('should be able to change the font size', () => {
    expect(component.currentFontSize).toBe(1);
    component.changeFontSize(0.1);
    expect(component.currentFontSize).toBe(1.1);
    for (let i = 0; i < 10; i++) {
      component.changeFontSize(0.1);
    }
    expect(component.currentFontSize).toBe(1.5);
    for (let i = 0; i < 20; i++) {
      component.changeFontSize(-0.1);
    }
    expect(component.currentFontSize).toBe(0.5);
  });

  it('should be able to display a cancel dialog', async () => {
    await component.displayCancelDialog();
    expect(alertControllerMock.create).toBeCalled();
    expect(alertControllerMock.create.mock.calls.pop()[0].message).toBe(
      'app.dialogs.cancelQuestionnaire.text',
    );
    expect(alertMock.present).toHaveBeenCalled();
  });
});
