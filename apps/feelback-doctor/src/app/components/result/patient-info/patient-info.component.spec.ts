import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientInfoComponent } from './patient-info.component';
import { MaterialModule } from '../../../material.module';
import { Patient } from '../../../models/patient';
import { DatePipe } from '@angular/common';

describe('PatientInfoComponent', () => {
  let component: PatientInfoComponent;
  let fixture: ComponentFixture<PatientInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [ PatientInfoComponent ],
      providers: [DatePipe]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientInfoComponent);
    component = fixture.componentInstance;
    component.patient = new Patient();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
