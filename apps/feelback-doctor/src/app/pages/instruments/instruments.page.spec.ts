import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentsPage } from './instruments.page';

describe('ChooseInstrumentPage', () => {
  let component: InstrumentsPage;
  let fixture: ComponentFixture<InstrumentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstrumentsPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrumentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
