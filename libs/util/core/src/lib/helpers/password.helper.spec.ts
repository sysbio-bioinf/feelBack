import { PasswordHelper } from './password.helper';

describe('PasswordHelper', () => {
  it('should generate password', async () => {
    const password = await PasswordHelper.hashPassword('password');

    expect(typeof password).toBe('string');
    expect(password).toContain('argon2i$');
  });

  it('should verify a password', async () => {
    const password = await PasswordHelper.hashPassword('password');

    expect(
      typeof (await PasswordHelper.validatePassword(password, 'password')),
    ).toBe('boolean');
    expect(
      await PasswordHelper.validatePassword(password, 'password'),
    ).toBeTruthy();

    expect(
      await PasswordHelper.validatePassword(password, 'invalid'),
    ).toBeFalsy();
  });
});
