import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { TranslateService } from '@ngx-translate/core';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  const ENGLISH_LANGUAGE = 'en';
  const ENGLISH_TRANSLATIONS = {
    pleasantries: {
      greeting: 'Hello',
      appreciation: 'Thank You!',
    },
  };

  const GERMAN_LANGUAGE = 'de';
  const GERMAN_TRANSLATIONS = {
    pleasantries: {
      greeting: 'Hallo',
      appreciation: 'Danke!',
    },
  };

  const TRANSLATIONS = {
    [ENGLISH_LANGUAGE]: ENGLISH_TRANSLATIONS,
    [GERMAN_LANGUAGE]: GERMAN_TRANSLATIONS,
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TranslateTestingModule.withTranslations(TRANSLATIONS).withDefaultLanguage('en')],
      declarations: [HeaderComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('can switch language', () => {
    expect(component.translateService.getDefaultLang()).toBe('en');
    expect(component.avLanguages.length).toBe(2);
    // now switch to german
    component.switchLanguage('de');
    expect(component.translateService.currentLang).toBe('de');
  });
});
