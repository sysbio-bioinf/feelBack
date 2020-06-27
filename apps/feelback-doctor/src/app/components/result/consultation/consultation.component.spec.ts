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
    component.screening = {
      id: 'id',
      instanceId: '',
      version: 1,
      payload: { DT01: 5, DT02: true },
      resolveComment: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      collectedAt: new Date(),
      instrument: {
        id: '',
        name: '',
        changelog: '',
        type: '',
        updatedAt: new Date(),
        createdAt: new Date(),
        version: 1,
        diagram: {},
        rules: [],
        payload: {},
        state: InstrumentStatesEnum.Released
      },
      language: '',
      evaluationResult: [
        { result: true, name: '', then: '', else: '', condition: '' },
      ],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
