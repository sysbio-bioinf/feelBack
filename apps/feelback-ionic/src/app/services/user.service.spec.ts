import { of, throwError } from 'rxjs';
import { UserService } from './user.service';

describe('UserService test', () => {
  let userService: UserService;

  const mockPseudonym = 'mockPseudo';
  const mockPerson = { id: '0', pseudonym: mockPseudonym, acceptedTOS: true };

  const getPersonByPseudonymServiceMock = {
    fetch: jest.fn(({ pseudonym: string }) =>
      of({ data: { personByPseudonym: mockPerson } }),
    ),
  };

  beforeEach(() => {
    userService = new UserService(getPersonByPseudonymServiceMock as any);
  });

  it('should login with pseudonym', async () => {
    expect(userService.loggedIn).toBe(false);
    expect(userService.pseudonym).toBe(undefined);
    expect(userService.person).toBeUndefined();
    await userService.loginWithPseudonym(mockPseudonym);
    expect(userService.person).toBe(mockPerson);
    expect(userService.loggedIn).toBe(true);
    expect(userService.pseudonym).toBe(mockPseudonym);
    getPersonByPseudonymServiceMock.fetch.mockReturnValueOnce(
      throwError(new Error('dummyError')),
    );
    expect(userService.loginWithPseudonym(mockPseudonym)).rejects.toThrowError(
      'app.errors.services.user.pseudonymLogin',
    );
  });

  it('should login as anonymous', () => {
    expect(userService.loggedIn).toBe(false);
    expect(userService.pseudonym).toBe(undefined);
    expect(userService.person).toBe(undefined);
    userService.loginAnonymous();
    expect(userService.loggedIn).toBe(true);
    expect(userService.pseudonym).toBe(null);
    expect(userService.person).toBe(null);
  });

  it('should logout', () => {
    userService.loggedIn = true;
    userService.pseudonym = 'mockPseudo';
    userService.person = mockPerson;
    userService.logout();
    expect(userService.loggedIn).toBe(false);
    expect(userService.pseudonym).toBe(null);
    expect(userService.person).toBe(null);
  });

  it('should verify if a user is loged in', () => {
    let isLoggedIn;
    userService.loggedIn = true;
    isLoggedIn = userService.isLoggedIn();
    expect(isLoggedIn).toBe(true);
    userService.loggedIn = false;
    isLoggedIn = userService.isLoggedIn();
    expect(isLoggedIn).toBe(false);
  });
});
