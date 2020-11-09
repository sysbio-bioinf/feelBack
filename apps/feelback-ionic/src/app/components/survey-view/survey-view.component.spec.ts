import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { Apollo } from 'apollo-angular';
import { NgPipesModule } from 'ngx-pipes';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { PrinterService } from '../../services/printer.service';
import { StorageService } from '../../services/storage.service';
import { SurveyViewComponent } from './survey-view.component';

describe('SurveyViewComponent', () => {
  let component: SurveyViewComponent;
  let fixture: ComponentFixture<SurveyViewComponent>;

  const storageServiceSpy = undefined;
  const printerServiceSpy = undefined;
  const translatePipeSpy = undefined;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SurveyViewComponent],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule,
        TranslateTestingModule.withTranslations({'en': {}}),
        NgPipesModule,
      ],
      providers: [
        Apollo,
        { provide: StorageService, useValue: storageServiceSpy },
        { provide: PrinterService, useValue: printerServiceSpy },
        { provide: TranslatePipe, useValue: translatePipeSpy },
      ],
    }).compileComponents();
  }));

  it('should create', () => {
    fixture = TestBed.createComponent(SurveyViewComponent);
    component = fixture.componentInstance;
    component.instrument = {
      id: '',
      description: '',
      name: '',
      type: '',
      payload: {"startSurveyText": {"default": "Start", "de": "Starten"}},
      changelog: '',
      image: '',
      rules: [],
    };
    component.selectedLanguage = 'en';

    expect(component).toBeTruthy();
  });

  it('should setup the instrument page and use the correct language', async () => {
    await component.ngOnInit();
    // setup instrument page
    expect(component.surveyCompleted).toBe(false);
    expect(component.survey).toBeDefined();
    expect(component.survey.showTitle).toBe(false);
    expect(component.survey.showNavigationButtons).toEqual('none');
    expect(component.survey.showQuestionNumbers).toEqual('off');
    expect(component.survey.showCompletedPage).toBe(false);
    expect(component.survey.showPageNumbers).toBe(false);
    expect(component.survey.showProgressBar).toEqual('off');
    // survey.local == '' means that 'en' is used (see documentation )
    expect(component.survey.locale).toEqual('');
  })
});
