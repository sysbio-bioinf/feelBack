import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrganizationListPage } from './organization-list.page';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { GraphQLModule } from 'src/app/modules/graphql.module';
import { ApolloModule } from 'apollo-angular';
import { HttpLinkModule } from 'apollo-angular-link-http';
import { HttpClientModule } from '@angular/common/http';

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
        GraphQLModule,
        HttpClientModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OrganizationListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
