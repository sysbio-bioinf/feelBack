import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyPage } from './privacy.page';
import { ComponentsModule } from '../../modules/components.module';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { MarkdownModule } from 'ngx-markdown';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('PrivacyPage', () => {
  let component: PrivacyPage;
  let fixture: ComponentFixture<PrivacyPage>;

  const ENGLISH_LANGUAGE = 'en';
  const GERMAN_LANGUAGE = 'de';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ComponentsModule,
        HttpClientModule,
        TranslateTestingModule.withTranslations({
          [ENGLISH_LANGUAGE]: {},
          [GERMAN_LANGUAGE]: {},
        }).withDefaultLanguage(ENGLISH_LANGUAGE),
        RouterTestingModule,
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

  it('can switch languages', () => {
    component.translateService.use('en');
    expect(component.translateService.currentLang).toBe('en');
    component.translateService.use('de');
    expect(component.translateService.currentLang).toBe('de');
  });

  it('should create a path to md files', () => {
    component.translateService.use('en');
    const enPath = component.getMarkdownFile('privacy');
    expect(enPath).toMatch(/\/assets\/.*\/en\/privacy\.md/);
    component.translateService.use('de');
    const dePath = component.getMarkdownFile('privacy');
    expect(dePath).toMatch(/\/assets\/.*\/de\/privacy\.md/);
  });
});
