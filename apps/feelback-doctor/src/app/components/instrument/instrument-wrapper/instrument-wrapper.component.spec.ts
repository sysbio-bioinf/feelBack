import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentWrapperComponent } from './instrument-wrapper.component';

describe('InstrumentWrapperComponent', () => {
  let component: InstrumentWrapperComponent;
  let fixture: ComponentFixture<InstrumentWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstrumentWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrumentWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
