import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrganizationDetailPage } from './organization-detail.page';
import { RouterModule, Router } from '@angular/router';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { Apollo } from 'apollo-angular';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('OrganizationDetailPage', () => {
  let component: OrganizationDetailPage;
  let fixture: ComponentFixture<OrganizationDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizationDetailPage],
      imports: [
        IonicModule.forRoot(),
        RouterModule.forRoot([]),
        TranslateModule.forRoot(),
        RouterTestingModule
      ],
      providers: [TranslatePipe, Apollo, HttpClient],
    }).compileComponents();

    fixture = TestBed.createComponent(OrganizationDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
