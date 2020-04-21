import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SurveyViewComponent } from './survey-view.component';
import { RouterModule } from '@angular/router';
import { TranslatePipe, TranslateModule } from '@ngx-translate/core';

describe('SurveyViewComponent', () => {
  let component: SurveyViewComponent;
  let fixture: ComponentFixture<SurveyViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SurveyViewComponent],
      imports: [
        IonicModule.forRoot(),
        RouterModule.forRoot([]),
        TranslateModule.forRoot(),
      ],
      providers: [TranslatePipe],
    }).compileComponents();

    fixture = TestBed.createComponent(SurveyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
