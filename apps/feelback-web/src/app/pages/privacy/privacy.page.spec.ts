import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyPage } from './privacy.page';
import { ComponentsModule } from '../../modules/components.module';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { MarkdownModule } from 'ngx-markdown';
import { HttpClientModule, HttpClient } from '@angular/common/http';

describe('PrivacyPage', () => {
  let component: PrivacyPage;
  let fixture: ComponentFixture<PrivacyPage>;

  const ENGLISH_LANGUAGE = 'en';
  const ENGLISH_TRANSLATIONS = {
    pleasantries: {
      greeting: 'Hello',
      appreciation: 'Thank You!',
    },
  };

  const TRANSLATIONS = {
    [ENGLISH_LANGUAGE]: ENGLISH_TRANSLATIONS,
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ComponentsModule,
        HttpClientModule,
        TranslateTestingModule.withTranslations(
          TRANSLATIONS,
        ).withDefaultLanguage('en'),
        MarkdownModule.forRoot({ loader: HttpClient }),
      ],
      declarations: [PrivacyPage],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have selected "en" language', () => {
    expect(component.translateService.getDefaultLang()).toBe('en');
  });

  it('should create a path to md file', () => {
    component.translateService.use('en');
    const enPath = component.getMarkdownFile('privacy');
    expect(enPath).toMatch(/\/assets\/.*\/en\/privacy\.md/);
  });
});
