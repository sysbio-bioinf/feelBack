import { HttpStatus } from '@nestjs/common';
import { ConfigModule } from '@feelback-app/api/config';
import { ApiException } from '@feelback-app/api/errors';
import { KeycloakStrategy } from './keycloak-bearer.strategy';
import { User } from '@feelback-app/api/auth';
import { mockEmptyEnvironment } from '@feelback-app/api/testing';
import { Test } from '@nestjs/testing';

function mockDone(error: Error, user?: User, msg?: string): any {
  return {
    error: error,
    user: user,
    msg: msg,
  };
}

/*
TODO:
Fix this error:

KeycloakBearerStrategy - Unable to get OIDC metadata from 
http://keycloak:8080/auth/realms/test/.well-known/openid-configuration: 
Error: getaddrinfo ENOTFOUND keycloak

This is caused by the super-constructor-call in KeycloakStrategy for PassportStrategy.
Mocking PassportStrategy or running a keycloak-server could fix this issue.
*/
describe('KeyCloakStrategy', () => {
  let keycloakStrategy: KeycloakStrategy;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(mockEmptyEnvironment)],
      providers: [KeycloakStrategy],
    }).compile();

    keycloakStrategy = module.get<KeycloakStrategy>(KeycloakStrategy);
  });

  it('should be defined', () => {
    expect(keycloakStrategy).toBeDefined();
  });

  it('throw exception for empty JwtToken', async () => {
    const emptyJwtToken = null;
    const result = await keycloakStrategy.validate(emptyJwtToken, mockDone);
    expect(result.error).toBeInstanceOf(ApiException);
    expect(result.error.getResponse()).toBeTruthy();
    expect(result.error.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(result.user).toBeUndefined();
    expect(result.msg).toBeUndefined();
  });

  it('error message for non-sub', async () => {
    const nonSubJwtToken = {
      sub: '',
    };
    const result = await keycloakStrategy.validate(nonSubJwtToken, mockDone);
    expect(result.error).toBeNull();
    expect(result.user).toBeFalsy();
    expect(result.msg).toBeDefined();
  });

  it('user and error message for missing role', async () => {
    const testId = 'Test';
    const missingRealmAccessJwtToken = {
      sub: testId,
      realm_access: null,
    };
    const expectedUser = new User(testId);
    let result = await keycloakStrategy.validate(
      missingRealmAccessJwtToken,
      mockDone,
    );
    expect(result.error).toBeNull();
    expect(result.user).toStrictEqual(expectedUser);
    expect(result.msg).toBeDefined();

    const missingRealmAccessRolesJwtToken = {
      sub: testId,
      realm_access: {
        roles: null,
      },
    };
    result = await keycloakStrategy.validate(
      missingRealmAccessRolesJwtToken,
      mockDone,
    );
    expect(result.error).toBeNull();
    expect(result.user).toStrictEqual(expectedUser);
    expect(result.msg).toBeDefined();
  });

  it('correct output for valid input', async () => {
    const testId = 'Test';
    const testRoles = ['TestRole'];
    const validJwtToken = {
      sub: testId,
      realm_access: {
        roles: testRoles,
      },
    };
    const expectedUser = new User(testId, testRoles);
    const result = await keycloakStrategy.validate(validJwtToken, mockDone);
    expect(result.error).toBeNull();
    expect(result.user).toStrictEqual(expectedUser);
    expect(result.msg).toBeUndefined();
  });
});
