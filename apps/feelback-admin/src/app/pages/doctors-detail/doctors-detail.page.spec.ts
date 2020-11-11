import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsDetailPage } from './doctors-detail.page';

describe('DoctorsDetailPage', () => {
  let component: DoctorsDetailPage;
  let fixture: ComponentFixture<DoctorsDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DoctorsDetailPage],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorsDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
