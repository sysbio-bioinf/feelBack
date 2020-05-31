import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireComponent } from './questionnaire.component';
import { MaterialModule } from '../../../material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Screening } from '../../../models/Screening';
import { DatePipe } from '@angular/common';

describe('QuestionnaireComponent', () => {
  let component: QuestionnaireComponent;
  let fixture: ComponentFixture<QuestionnaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, RouterTestingModule],
      declarations: [ QuestionnaireComponent ],
      providers: [DatePipe]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireComponent);
    component = fixture.componentInstance;
    component.screening = new Screening();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
