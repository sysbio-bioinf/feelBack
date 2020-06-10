import { HttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
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
        RouterTestingModule,
        TranslateModule.forRoot(),
      ],
      providers: [TranslatePipe, Apollo, HttpClient],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(OrganizationListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
