import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationComponent } from './consultation.component';
import { MaterialModule } from '../../../material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { InstrumentStatesEnum } from '../../../graphql/generated/feelback.graphql';

describe('ConsultationComponent', () => {
  let component: ConsultationComponent;
  let fixture: ComponentFixture<ConsultationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, BrowserAnimationsModule],
      declarations: [ConsultationComponent],
      providers: [DatePipe],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationComponent);
    component = fixture.componentInstance;
    component.evaluationResult = { result: true, name: '', then: '', else: '', condition: '' };
    component.resolveComment = 'comment'
    component.createdAt = new Date();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
