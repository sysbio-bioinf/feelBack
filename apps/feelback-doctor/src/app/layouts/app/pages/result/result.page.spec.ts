import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultPage } from './result.page';
import { ComponentsModule } from 'apps/feelback-doctor/src/app/components/components.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Apollo } from 'apollo-angular';
import { DatePipe } from '@angular/common';

describe('ResultPage', () => {
  let component: ResultPage;
  let fixture: ComponentFixture<ResultPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ComponentsModule, RouterTestingModule],
      providers: [Apollo, DatePipe],
      declarations: [ ResultPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
