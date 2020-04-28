import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalCardsComponent } from './patient-card.component';

describe('GlobalCardsComponent', () => {
  let component: GlobalCardsComponent;
  let fixture: ComponentFixture<GlobalCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
