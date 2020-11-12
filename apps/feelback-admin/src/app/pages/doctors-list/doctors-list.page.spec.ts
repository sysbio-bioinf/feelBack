import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsListPage } from './doctors-list.page';

describe('DoctorsListPage', () => {
  let component: DoctorsListPage;
  let fixture: ComponentFixture<DoctorsListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DoctorsListPage],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
