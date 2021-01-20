import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { PrivacyPage } from './privacy.page';

describe('PrivacyComponent', () => {
  let component: PrivacyPage;
  let fixture: ComponentFixture<PrivacyPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PrivacyPage],
        imports: [
          IonicModule.forRoot(),
          RouterTestingModule,
          TranslateTestingModule.withTranslations('en', {}),
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      }).compileComponents();

      fixture = TestBed.createComponent(PrivacyPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the correct filePath', () => {
    const testCurrentLang = 'en';
    const testFileName = 'privacy';
    const pattern = new RegExp(
      './assets/texts/' + testCurrentLang + '/' + testFileName + '.md',
    );
    component.translateService.currentLang = testCurrentLang;
    const filePathTest = component.getMarkdownFile(testFileName);
    expect(filePathTest).toMatch(pattern);
  });
});
