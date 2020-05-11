import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreeningOverviewComponent } from './screening-overview.component';

describe('ScreeningOverviewComponent', () => {
  let component: ScreeningOverviewComponent;
  let fixture: ComponentFixture<ScreeningOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreeningOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreeningOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
