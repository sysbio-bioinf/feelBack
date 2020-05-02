import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseInstrumentComponent } from './choose-instrument.component';

describe('ChooseInstrumentComponent', () => {
  let component: ChooseInstrumentComponent;
  let fixture: ComponentFixture<ChooseInstrumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseInstrumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseInstrumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
