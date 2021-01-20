import { HttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  IonicModule,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { Apollo } from 'apollo-angular';
import { Identity } from '../../graphql/generated/feelback.graphql';
import { IdentityService } from '../../services/api/identity.service';
import { UserService } from '../../services/user.service';
import { ProfilePage } from './profile.page';

describe('ProfilePage', () => {
  let component: ProfilePage;
  let fixture: ComponentFixture<ProfilePage>;

  const routerMock = {
    navigate: jest.fn(),
  };

  const toastMock = {
    present: jest.fn(() => Promise.resolve()),
  };

  const toastControllerMock = {
    create: jest.fn((any) => Promise.resolve(toastMock)),
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

  const userServiceMock = {
    pseudonym: 'testPseudonym',
  };

  const identityMock = <Partial<Identity>>{
    id: '42',
    firstname: 'firstnameMock',
    lastname: 'lastnameMock',
    pseudonym: 'pseudonymMock',
    title: 'titleMock',
    __typename: 'Identity',
  };

  const identityServiceMock = {
    getIdentityByPseudonym: jest.fn((pesudonym: string) =>
      Promise.resolve(identityMock),
    ),
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ProfilePage],
        imports: [
          IonicModule.forRoot(),
          RouterTestingModule,
          TranslateModule.forRoot(),
        ],
        providers: [
          TranslatePipe,
          Apollo,
          HttpClient,
          { provide: ToastController, useValue: toastControllerMock },
          { provide: IdentityService, useValue: identityServiceMock },
          { provide: UserService, useValue: userServiceMock },
          { provide: Router, useValue: routerMock },
          { provide: LoadingController, useValue: loadingControllerMock },
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();

      fixture = TestBed.createComponent(ProfilePage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return on ionViewWillEnter when no pseudonym is availble', async () => {
    component.userService.pseudonym = null;
    expect(component.userService.pseudonym).toBe(null);
    await component.ionViewWillEnter();
    expect(toastControllerMock.create).toBeCalled();
    expect(toastControllerMock.create.mock.calls[0][0].message).toBe(
      'app.pages.profile.toasts.notLoggedIn',
    );
    expect(routerMock.navigate).toHaveBeenCalledWith(['main', 'home'], {
      replaceUrl: true,
    });
  });

  it('should get the data of the user from the identityService', async () => {
    component.userService.pseudonym = 'dummy';
    expect(component.userService.pseudonym).toBe('dummy');
    expect(component.identity).toBe(undefined);
    await component.ionViewWillEnter();
    expect(component.identity).toBe(identityMock);
  });

  it('should display a error Toast when there is no data to a user and return to main', async () => {
    component.userService.pseudonym = 'dummy';
    identityServiceMock.getIdentityByPseudonym.mockReturnValueOnce(undefined);
    await component.ionViewWillEnter();
    expect(toastControllerMock.create).toBeCalled();
    expect(toastControllerMock.create.mock.calls[1][0].message).toBe(
      'app.errors.api.noData',
    );
    expect(routerMock.navigate).toHaveBeenCalledWith(['main', 'home'], {
      replaceUrl: true,
    });
  });

  it('should navigate to home and login', () => {
    component.navigateToHome();
    expect(routerMock.navigate).toHaveBeenCalledWith(['main', 'home'], {
      replaceUrl: true,
    });
    component.navigateToLogin();
    expect(routerMock.navigate).toHaveBeenCalledWith(['auth', 'login'], {
      replaceUrl: true,
    });
  });
});
