import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLayout } from './app.layout';
import { ComponentsModule } from '../../components/components.module';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../../material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AppLayout', () => {
  let component: AppLayout;
  let fixture: ComponentFixture<AppLayout>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ComponentsModule, MaterialModule, RouterTestingModule, BrowserAnimationsModule],
      declarations: [ AppLayout ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
