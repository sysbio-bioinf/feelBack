import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Apollo } from 'apollo-angular';
import { ScreeningsPage } from './screenings.page';
import { ComponentsModule } from '../../../../../../components/components.module';
import { MaterialModule } from '../../../../../../../../src/app/material.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

describe('ScreeningsPage', () => {
  let component: ScreeningsPage;
  let fixture: ComponentFixture<ScreeningsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ComponentsModule, RouterTestingModule, MaterialModule, NgxChartsModule, ReactiveFormsModule],
      providers: [Apollo, DatePipe],
      declarations: [ScreeningsPage],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreeningsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
