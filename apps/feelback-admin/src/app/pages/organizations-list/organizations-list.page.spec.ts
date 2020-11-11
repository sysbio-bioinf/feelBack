import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationsListPage } from './organizations-list.page';

describe('OrganizationsListPage', () => {
  let component: OrganizationsListPage;
  let fixture: ComponentFixture<OrganizationsListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrganizationsListPage],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
