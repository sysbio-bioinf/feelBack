import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleInstrumentComponent } from './sample-instrument.component';
import { MaterialModule } from '../../../material.module';

describe('SampleInstrumentComponent', () => {
  let component: SampleInstrumentComponent;
  let fixture: ComponentFixture<SampleInstrumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [ SampleInstrumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleInstrumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
