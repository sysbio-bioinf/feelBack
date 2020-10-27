import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { Apollo } from 'apollo-angular';
import { NgPipesModule } from 'ngx-pipes';
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
        TranslateModule.forRoot({}),
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
      payload: {},
      changelog: '',
      image: '',
      rules: [],
    };
    component.selectedLanguage = '';

    expect(component).toBeTruthy();
  });
});
