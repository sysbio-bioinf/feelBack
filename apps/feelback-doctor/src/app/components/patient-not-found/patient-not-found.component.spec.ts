import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientNotFoundComponent } from './patient-not-found.component';

describe('PatientNotFoundComponent', () => {
  let component: PatientNotFoundComponent;
  let fixture: ComponentFixture<PatientNotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientNotFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
