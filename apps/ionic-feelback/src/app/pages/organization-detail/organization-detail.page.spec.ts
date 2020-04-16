import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrganizationDetailPage } from './organization-detail.page';
import { TranslateModule } from '@ngx-translate/core';
import { GraphQLModule } from 'src/app/modules/graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

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
        GraphQLModule,
        HttpClientModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OrganizationDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
