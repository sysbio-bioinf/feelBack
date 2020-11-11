import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationsDetailPage } from './organizations-detail.page';

describe('OrganizationsDetailPage', () => {
  let component: OrganizationsDetailPage;
  let fixture: ComponentFixture<OrganizationsDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrganizationsDetailPage],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationsDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
