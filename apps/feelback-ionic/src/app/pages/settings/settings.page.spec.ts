import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule, ToastController } from '@ionic/angular';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { TranslatableError } from '../../core/customErrors/translatableError';
import { ApplicationLanguageModel } from '../../models/application-language.model';
import { LanguageService } from '../../services/language.service';
import { SettingsPage } from './settings.page';

describe('SettingsPage', () => {
  let component: SettingsPage;
  let fixture: ComponentFixture<SettingsPage>;

  const mockLanguageEn = 'en';
  const mockLanguageDe = 'de';
  let currentLanguage = 'en';

  const mockEvent = new CustomEvent('mock', { detail: { value: 'de' } });

  const mockAppLanguages: ApplicationLanguageModel[] = [
    { name: 'English', nativeName: 'English', code: 'en' },
    { name: 'German', nativeName: 'Deutsch', code: 'de' },
  ];

  const languageServiceMock = {
    currentLanguage: '',
    getCurrentLanguage: jest.fn(() => currentLanguage),
    getAvailableLanguages: jest.fn(() => mockAppLanguages),
    switchLanguage: jest.fn((newLanguage: string) => {
      currentLanguage = newLanguage;
    }),
  };

  const toastMock = {
    present: jest.fn(() => Promise.resolve()),
  };

  const toastControllerMock = {
    create: jest.fn((any) => Promise.resolve(toastMock)),
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SettingsPage],
        imports: [
          IonicModule.forRoot(),
          RouterTestingModule,
          TranslateModule.forRoot(),
        ],
        providers: [
          TranslatePipe,
          { provide: LanguageService, useValue: languageServiceMock },
          { provide: ToastController, useValue: toastControllerMock },
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();

      fixture = TestBed.createComponent(SettingsPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.currentLanguage).toBe(currentLanguage);
    expect(component.availableLanguages).toBe(mockAppLanguages);
  });

  it('should be able to switch the current language', () => {
    expect(component.currentLanguage).toBe(mockLanguageEn);
    component.switchLanguage(mockEvent);
    expect(currentLanguage).toBe(mockLanguageDe);
    expect(component.currentLanguage).toBe(mockLanguageDe);
    expect(languageServiceMock.switchLanguage).toBeCalledWith(
      mockEvent.detail.value,
    );
  });

  it('should handle errors', () => {
    let errMsg = 'Service Error';
    languageServiceMock.getAvailableLanguages.mockImplementationOnce(() => {
      throw new Error(errMsg);
    });
    component.ngOnInit();
    expect(toastControllerMock.create).toBeCalled();
    expect(toastControllerMock.create.mock.calls.pop()[0].message).toBe(errMsg);
    errMsg = 'app.error.msg';
    languageServiceMock.getAvailableLanguages.mockImplementationOnce(() => {
      throw new TranslatableError(errMsg);
    });
    component.ngOnInit();
    expect(toastControllerMock.create.mock.calls.pop()[0].message).toBe(errMsg);
  });
});
