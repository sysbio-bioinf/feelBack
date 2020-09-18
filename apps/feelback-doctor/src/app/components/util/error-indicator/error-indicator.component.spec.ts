import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorIndicatorComponent } from './error-indicator.component';
import { MaterialModule } from '../../../material.module';

describe('ErrorIndicatorComponent', () => {
  let component: ErrorIndicatorComponent;
  let fixture: ComponentFixture<ErrorIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [ErrorIndicatorComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
