import { HttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { Apollo } from 'apollo-angular';
import { UserService } from '../../services/user.service';
import { StartPage } from './start.page';

describe('StartPage', () => {
  let component: StartPage;
  let fixture: ComponentFixture<StartPage>;

  const routerMock = {
    navigate: jest.fn(),
  };

  let userServiceLoggedIn = false;

  const userServiceMock = {
    loginAnonymous: jest.fn(() => (userServiceLoggedIn = true)),
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [StartPage],
        imports: [
          IonicModule.forRoot(),
          RouterTestingModule,
          TranslateModule.forRoot(),
        ],
        providers: [
          TranslatePipe,
          Apollo,
          HttpClient,
          { provide: Router, useValue: routerMock },
          { provide: UserService, useValue: userServiceMock },
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();

      fixture = TestBed.createComponent(StartPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the introducation page', () => {
    component.navigateToTutorial();
    expect(routerMock.navigate).toHaveBeenLastCalledWith(['/tutorial']);
  });

  it('should navigate to the login page', () => {
    component.navigateToLogin();
    expect(routerMock.navigate).toHaveBeenLastCalledWith(['/auth/login']);
  });

  it('should handle anonymous logins', () => {
    component.loginAsAnonymous();
    expect(userServiceLoggedIn).toBe(true);
    expect(routerMock.navigate).toHaveBeenLastCalledWith(['/main/home'], {
      replaceUrl: true,
    });
  });
});
