import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentNotFoundComponent } from './instrument-not-found.component';

describe('InstrumentNotFoundComponent', () => {
  let component: InstrumentNotFoundComponent;
  let fixture: ComponentFixture<InstrumentNotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstrumentNotFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrumentNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
