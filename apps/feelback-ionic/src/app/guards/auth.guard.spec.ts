import { inject, TestBed } from '@angular/core/testing';
import { Router, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Apollo } from 'apollo-angular';
import { UserService } from '../services/user.service';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  const userServiceMock = {
    isLoggedIn: jest.fn(() => false),
  };

  const routeMock: any = {
    snapshot: {},
    params: {},
  };

  const routerStateMock: any = {
    snapshot: {},
    url: '/forbidden',
  };

  const routerMock = {
    navigate: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        Apollo,
        { provide: UserService, useValue: userServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    });
  });

  it('should create', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should check if the user is logged in', inject(
    [AuthGuard],
    (guard: AuthGuard) => {
      expect(guard.canActivate(routeMock, routerStateMock)).toEqual(false);
      expect(routerMock.navigate).toHaveBeenCalledWith(['start']);
      userServiceMock.isLoggedIn.mockReturnValueOnce(true);
      expect(guard.canActivate(routeMock, routerStateMock)).toEqual(true);
    },
  ));
});
