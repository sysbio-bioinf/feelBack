import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentPage } from './instrument.page';

describe('PatientDetailsPage', () => {
  let component: InstrumentPage;
  let fixture: ComponentFixture<InstrumentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstrumentPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrumentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
