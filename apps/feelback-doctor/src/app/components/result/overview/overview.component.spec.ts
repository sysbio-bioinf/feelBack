import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewComponent } from './overview.component';
import { MaterialModule } from '../../../material.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CommonService } from '../../../services/common.service';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';

describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, NgxChartsModule, RouterTestingModule, BrowserAnimationsModule],
      providers: [CommonService, DatePipe],
      declarations: [OverviewComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewComponent);
    component = fixture.componentInstance;
    component.screening = {
      result: { DT01: 5, DT02: true },
      comment: '',
      date: new Date(),
      instrument: '',
      locale: '',
    };
    component.diagram = {
      instance: {
        overview: {
          type: 'radar',
          axis: [],
        },
      },
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
