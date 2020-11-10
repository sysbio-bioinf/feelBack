import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { IonHeader, IonicModule, IonSelect } from '@ionic/angular';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { HeaderComponent } from './header.component';
import { ApplicationLanguageModel } from '../../models/application-language.model';
import { LanguageService } from '../../services/language.service';
import { RouterTestingModule } from '@angular/router/testing';

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

  it('should set values on init', () => {
    component.ngOnInit();
    expect(languageServiceMock.getCurrentLanguage).toBeCalled();
    expect(languageServiceMock.getAvailableLanguages).toBeCalled();
    expect(component.currentLanguage).toBe(mockLanguageEn);
    expect(component.availableLanguages).toBe(mockAppLanguages);
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
});
