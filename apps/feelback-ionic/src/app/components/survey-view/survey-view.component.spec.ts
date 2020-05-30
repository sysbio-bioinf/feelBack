import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SurveyViewComponent } from './survey-view.component';
import { RouterModule } from '@angular/router';
import { TranslatePipe, TranslateModule, TranslateService } from '@ngx-translate/core';
import { StorageService } from 'src/app/services/storage.service';
import { Apollo } from 'apollo-angular';
import { PrinterService } from 'src/app/services/printer.service';

describe('SurveyViewComponent', () => {
  let component: SurveyViewComponent;
  let fixture: ComponentFixture<SurveyViewComponent>;

  const spy = jasmine.createSpyObj('spy', {test: 'test'});

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

    fixture = TestBed.createComponent(SurveyViewComponent);
    component = fixture.componentInstance;
    component.instrument = {id: '', description: '', name: '', type: '', payload: {}, changelog: '', image: '', rules: []};
    component.selectedLanguage = '';
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
