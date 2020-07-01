import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  const ENGLISH_LANGUAGE = 'en';
  const GERMAN_LANGUAGE = 'de';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateTestingModule.withTranslations({
          [ENGLISH_LANGUAGE]: {},
          [GERMAN_LANGUAGE]: {},
        }).withDefaultLanguage(ENGLISH_LANGUAGE),
      ],
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
    component.switchLanguage('de');
    expect(component.translateService.currentLang).toBe('de');
  });
});
