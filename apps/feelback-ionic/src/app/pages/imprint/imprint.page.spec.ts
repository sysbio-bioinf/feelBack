import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { ImprintPage } from './imprint.page';
import { MarkdownModule } from 'ngx-markdown';

describe('ImprintPage', () => {
  let component: ImprintPage;
  let fixture: ComponentFixture<ImprintPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ImprintPage],
        imports: [
          IonicModule.forRoot(),
          TranslateModule.forRoot(),
          RouterTestingModule,
          MarkdownModule.forRoot(),
        ],
        providers: [TranslatePipe],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();
      fixture = TestBed.createComponent(ImprintPage);
      component = fixture.componentInstance;
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.teamMembers).toBeDefined();
  });

  it('should create the correct filePath', () => {
    const testCurrentLang = 'en';
    const testFileName = 'imprint';
    const pattern = new RegExp(
      './assets/texts/' + testCurrentLang + '/' + testFileName + '.md',
    );
    component.translateService.currentLang = testCurrentLang;
    const filePathTest = component.getMarkdownFile(testFileName);
    expect(filePathTest).toMatch(pattern);
  });
});
