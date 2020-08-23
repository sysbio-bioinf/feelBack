import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionBarComponent } from './action-bar.component';
import { ComponentsModule } from '../../components.module';
import { DatePipe } from '@angular/common';
import { Apollo } from 'apollo-angular';
import { RouterTestingModule } from '@angular/router/testing';
import { ScreeningService } from '../../../services/screening.service';

describe('ActionBarComponent', () => {
  let component: ActionBarComponent;
  let fixture: ComponentFixture<ActionBarComponent>;
  let screeningServiceStub: Partial<ScreeningService>;

  screeningServiceStub = {
    screenings: [],
    index: 0
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ComponentsModule, RouterTestingModule],
      declarations: [],
      providers: [DatePipe, Apollo, { provide: ScreeningService, useValue: screeningServiceStub }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionBarComponent);
    component = fixture.componentInstance;
    component.patient = { id: "id", pseudonym: "test"};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
