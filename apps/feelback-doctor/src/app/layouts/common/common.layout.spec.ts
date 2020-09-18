import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonLayout } from './common.layout';
import { MaterialModule } from '../../material.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('CommonLayout', () => {
  let component: CommonLayout;
  let fixture: ComponentFixture<CommonLayout>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, RouterTestingModule],
      declarations: [CommonLayout],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
