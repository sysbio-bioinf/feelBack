import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentsDetailPage } from './instruments-detail.page';

describe('InstrumentsDetailPage', () => {
  let component: InstrumentsDetailPage;
  let fixture: ComponentFixture<InstrumentsDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstrumentsDetailPage],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrumentsDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
