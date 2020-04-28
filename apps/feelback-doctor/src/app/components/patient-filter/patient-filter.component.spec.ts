import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientFilterComponent } from './patient-filter.component';

describe('PatientFilterComponent', () => {
  let component: PatientFilterComponent;
  let fixture: ComponentFixture<PatientFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
