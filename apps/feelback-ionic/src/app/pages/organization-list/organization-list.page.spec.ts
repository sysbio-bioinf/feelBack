import { HttpClient } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { Apollo } from 'apollo-angular';
import { OrganizationListPage } from './organization-list.page';

describe('OrganizationListPage', () => {
  let component: OrganizationListPage;
  let fixture: ComponentFixture<OrganizationListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizationListPage],
      imports: [
        IonicModule.forRoot(),
        RouterModule.forRoot([]),
        TranslateModule.forRoot(),
      ],
      providers: [TranslatePipe, Apollo, HttpClient],
    }).compileComponents();

    fixture = TestBed.createComponent(OrganizationListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
