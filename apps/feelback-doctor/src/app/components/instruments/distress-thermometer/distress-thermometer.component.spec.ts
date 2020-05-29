import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistressThermometerComponent } from './distress-thermometer.component';
import { ComponentsModule } from '../../components.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('DistressThermometerComponent', () => {
  let component: DistressThermometerComponent;
  let fixture: ComponentFixture<DistressThermometerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ComponentsModule, RouterTestingModule],
      declarations: [],
    }).compileComponents();
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
