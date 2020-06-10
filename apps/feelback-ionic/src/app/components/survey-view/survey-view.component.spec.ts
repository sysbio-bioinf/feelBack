import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { Apollo } from 'apollo-angular';
import { PrinterService } from '../../services/printer.service';
import { StorageService } from '../../services/storage.service';
import { SurveyViewComponent } from './survey-view.component';

describe('SurveyViewComponent', () => {
  let component: SurveyViewComponent;
  let fixture: ComponentFixture<SurveyViewComponent>;

  const spy = jasmine.createSpyObj('spy', { test: 'test' });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SurveyViewComponent],
      imports: [
        IonicModule.forRoot(),
        RouterModule.forRoot([]),
        TranslateModule.forRoot(),
      ],
      providers: [
        TranslatePipe,
        Apollo,
        { provide: StorageService, useValue: spy },
        { provide: PrinterService, useValue: spy },
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
