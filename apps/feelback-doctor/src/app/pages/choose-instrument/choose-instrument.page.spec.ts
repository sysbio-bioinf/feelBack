import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseInstrumentPage } from './choose-instrument.page';

describe('ChooseInstrumentPage', () => {
  let component: ChooseInstrumentPage;
  let fixture: ComponentFixture<ChooseInstrumentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseInstrumentPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseInstrumentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
