import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLayout } from './app.layout';

describe('MainLayout', () => {
  let component: AppLayout;
  let fixture: ComponentFixture<AppLayout>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
