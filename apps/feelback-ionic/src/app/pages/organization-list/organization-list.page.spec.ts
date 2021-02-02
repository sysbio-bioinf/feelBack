import { HttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import {
  IonicModule,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { Apollo } from 'apollo-angular';
import { TranslatableError } from '../../core/customErrors/translatableError';
import { Organization } from '../../models/organization.model';
import { OrganizationService } from '../../services/api/organization.service';
import { OrganizationListPage } from './organization-list.page';

describe('OrganizationListPage', () => {
  let component: OrganizationListPage;
  let fixture: ComponentFixture<OrganizationListPage>;

  const routerMock = {
    navigate: jest.fn(),
  };

  const loadingMock = {
    present: jest.fn(() => Promise.resolve()),
    dismiss: jest.fn(() => Promise.resolve()),
    setContent: jest.fn(() => Promise.resolve()),
    setSpinner: jest.fn(() => Promise.resolve()),
  };

  const loadingControllerMock = {
    create: jest.fn((any) => loadingMock),
  };

  const toastMock = {
    present: jest.fn(() => Promise.resolve()),
  };

  const toastControllerMock = {
    create: jest.fn((any) => Promise.resolve(toastMock)),
  };

  const organizationsMock: Organization[] = [
    {
      id: '42',
      name: 'organizationMock',
      description: 'organizationMockDescription',
      type: 'orgMock',
      address: 'mockstreet 1337',
      phone: '12345-11833',
      email: 'mockMail@orgMock.com',
      url: 'https://mockOrg.com',
      logo: 'imgStringMock',
    },
  ];

  const organizationServiceMock = {
    getAll: jest.fn(() => Promise.resolve(organizationsMock)),
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [OrganizationListPage],
        imports: [IonicModule.forRoot(), TranslateModule.forRoot()],
        providers: [
          TranslatePipe,
          Apollo,
          HttpClient,
          { provide: Router, useValue: routerMock },
          { provide: LoadingController, useValue: loadingControllerMock },
          { provide: OrganizationService, useValue: organizationServiceMock },
          { provide: ToastController, useValue: toastControllerMock },
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();

      fixture = TestBed.createComponent(OrganizationListPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all organizations', async () => {
    expect(component.organizations).toEqual([]);
    expect(component.loaded).toBe(false);
    await component.ionViewWillEnter();
    expect(component.organizations).toBe(organizationsMock);
    expect(component.loaded).toBe(true);
    expect(component.loading.dismiss).toHaveBeenCalled();
  });

  it('should use the loadingController', async () => {
    expect(component.loading).not.toBeDefined();
    await component.presentLoading();
    expect(component.loading).toBeDefined();
    expect(component.loadingController.create).toHaveBeenCalledWith({
      message: 'app.general.loading',
    });
    expect(component.loading.present).toHaveBeenCalled();
  });

  it('should navigate to the correct organization id', async () => {
    const orgId = organizationsMock[0].id;
    await component.showDetails(orgId);
    expect(component.router.navigate).toHaveBeenCalledWith([
      'main',
      'organizations',
      orgId,
    ]);
  });

  it('should handle errors', async () => {
    let errMsg = 'Service Error';
    organizationServiceMock.getAll.mockImplementationOnce(() => {
      throw new Error(errMsg);
    });
    await component.ionViewWillEnter();
    expect(toastControllerMock.create).toBeCalled();
    expect(toastControllerMock.create.mock.calls.pop()[0].message).toBe(errMsg);
    errMsg = 'app.error.msg';
    organizationServiceMock.getAll.mockImplementationOnce(() => {
      throw new TranslatableError(errMsg);
    });
    await component.ionViewWillEnter();
    expect(toastControllerMock.create.mock.calls.pop()[0].message).toBe(errMsg);
  });
});
