import { HttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule, LoadingController } from '@ionic/angular';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { Apollo } from 'apollo-angular';
import { Organization } from '../../models/organization.model';
import { OrganizationService } from '../../services/api/organization.service';
import { OrganizationDetailPage } from './organization-detail.page';

describe('OrganizationDetailPage', () => {
  let component: OrganizationDetailPage;
  let fixture: ComponentFixture<OrganizationDetailPage>;

  const loadingMock = {
    present: jest.fn(() => Promise.resolve()),
    dismiss: jest.fn(() => Promise.resolve()),
    setContent: jest.fn(() => Promise.resolve()),
    setSpinner: jest.fn(() => Promise.resolve()),
  };

  const loadingControllerMock = {
    create: jest.fn((any) => loadingMock),
  };

  const organizationMock = <Organization>{
    id: '42',
    name: 'organizationMock',
    description: 'organizationMockDescription',
    type: 'orgMock',
    address: 'mockstreet 1337',
    phone: '12345-11833',
    email: 'mockMail@orgMock.com',
    url: 'https://mockOrg.com',
    logo: 'imgStringMock',
  };

  const organizationServiceMock = {
    getById: jest.fn((id: string) => Promise.resolve(organizationMock)),
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [OrganizationDetailPage],
        imports: [
          IonicModule.forRoot(),
          TranslateModule.forRoot(),
          RouterTestingModule,
        ],
        providers: [
          TranslatePipe,
          Apollo,
          HttpClient,
          { provide: LoadingController, useValue: loadingControllerMock },
          { provide: OrganizationService, useValue: organizationServiceMock },
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();

      fixture = TestBed.createComponent(OrganizationDetailPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should behave correct in ionViewWillEnter', async () => {
    expect(component.organization).not.toBeDefined();
    expect(component.loading).not.toBeDefined();
    await component.ionViewWillEnter();
    await Promise.resolve(); // wait for presentLoading() -> loading.present()
    await Promise.resolve(); // wait for organizationService.getById(params,id)
    expect(component.loading).toBeDefined();
    expect(component.organization).toBe(organizationMock);
    expect(component.loading.dismiss).toHaveBeenCalled();
  });

  it('should use the loadingController in presentLoading()', async () => {
    expect(component.loading).not.toBeDefined();
    await component.presentLoading();
    expect(component.loadingController.create).toHaveBeenCalledWith({
      message: 'app.general.loading',
    });
    expect(component.loading).toBeDefined();
    expect(component.loading.present).toHaveBeenCalled();
  });
});
