import { HttpStatus } from '@nestjs/common';
import { ConfigModule } from '@feelback-app/api/config';
import { ApiException } from '@feelback-app/api/errors';
import { KeycloakStrategy } from './keycloak-bearer.strategy';
import { User } from '@feelback-app/api/auth';
import { mockEmptyEnvironment } from '@feelback-app/api/testing';
import { Test } from '@nestjs/testing';

// Mock KeycloakBearerStrategy to avoid connecting to keycloak-server
jest.mock('passport-keycloak-bearer');

// Mock done-method needed for validate-method
function mockDone(error: Error, user?: User, msg?: string): any {
  return {
    error: error,
    user: user,
    msg: msg,
  };
}

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

  describe('validate', () => {
    it('throw exception for empty JwtToken', async () => {
      const emptyJwtToken = null;
      const result = await keycloakStrategy.validate(emptyJwtToken, mockDone);
      expect(result.error).toBeInstanceOf(ApiException);
      expect(result.user).toBeFalsy();
      expect(result.msg).toBeFalsy();
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
});
