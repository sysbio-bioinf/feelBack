import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistressThermometerComponent } from './distress-thermometer.component';

describe('DistressThermometerComponent', () => {
  let component: DistressThermometerComponent;
  let fixture: ComponentFixture<DistressThermometerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistressThermometerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistressThermometerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
