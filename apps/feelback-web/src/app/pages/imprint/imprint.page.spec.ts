import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MarkdownModule } from 'ngx-markdown';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { ComponentsModule } from '../../modules/components.module';
import { ImprintPage } from './imprint.page';

describe('ImprintPage', () => {
  let component: ImprintPage;
  let fixture: ComponentFixture<ImprintPage>;

  const ENGLISH_LANGUAGE = 'en';
  const GERMAN_LANGUAGE = 'de';

  beforeEach(
    waitForAsync(() => {
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
        declarations: [ImprintPage],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ImprintPage);
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
    const enPath = component.getMarkdownFile('imprint');
    expect(enPath).toMatch(/\/assets\/.*\/en\/imprint\.md/);
    component.translateService.use('de');
    const dePath = component.getMarkdownFile('imprint');
    expect(dePath).toMatch(/\/assets\/.*\/de\/imprint\.md/);
  });
});
