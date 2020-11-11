import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentsListPage } from './instruments-list.page';

describe('InstrumentsListPage', () => {
  let component: InstrumentsListPage;
  let fixture: ComponentFixture<InstrumentsListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstrumentsListPage],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrumentsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
