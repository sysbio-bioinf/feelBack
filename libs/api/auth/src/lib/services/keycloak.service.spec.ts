import { KeycloakService } from './keycloak.service';
import { ConfigService } from '@feelback-app/api/config';
import { mockEmptyEnvironment } from '@feelback-app/api/testing';
import { HttpService } from '@nestjs/common';
import { CredentialsDto } from '../data/dtos/credentials.dto';
import { AuthTokenModel } from '../data/models/auth-token.model';
import { ApiException } from '@feelback-app/api/errors';
import { of } from 'rxjs';
import { KeycloakUserInfo } from '../data/models/keycloak-userinfo.model';
import KeycloakAdminClient from 'keycloak-admin';

// Mock ConfigService to avoid logging
jest.mock('@feelback-app/api/config', () => {
  return {
    ConfigService: jest.fn().mockImplementation((_cfg) => {
      return {
        get: (_path: string) => 'test',
      };
    }),
  };
});

// Function to generate AxiosResponse-Object for HttpService-Mock
const generateAxiosResponse = (data: any) => {
  return {
    data: data,
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {},
    request: {},
  };
};

// Result of valid use of MockHttpService.post
const tokenResponse = {
  token_type: 'token_type',
  access_token: 'access_token',
  expires_in: 100,
  refresh_token: 'refresh_token',
  refresh_expires_in: 50,
  scope: 'scope',
};

// Result of MockHttpService.get
const keycloakUserInfo: KeycloakUserInfo = {
  sub: 'sub',
  email: 'email',
  email_verified: true,
  preferred_username: 'preferred_username',
  roles: [],
};

// Mock HttpService-Methods that are needed
jest.mock('@nestjs/common/http', () => {
  return {
    HttpService: jest.fn(() => {
      return {
        post: function (_address: any, qs: string) {
          // Check for invalid inputs to simulate failed methodcall in HttpService.
          // If username or password are undefined in credentials, they won't be part of generated qs-string.
          if (!qs.includes('username') || !qs.includes('password')) {
            throw new Error();
          }
          return of(generateAxiosResponse(tokenResponse));
        },
        get: (_address: any, _headers: any) =>
          of(generateAxiosResponse(keycloakUserInfo)),
      };
    }),
  };
});

// Mock KeycloakAdminClient and its methods.
const keycloakId = 'keycloakId';
jest.mock('keycloak-admin/lib', () => {
  return {
    __esModule: true,
    default: jest.fn((_cfg: any) => {
      return {
        // Simulate failed authorization by checking for undefined username/password
        auth: function (this: KeycloakAdminClient, credentials: any) {
          if (
            credentials.username === undefined ||
            credentials.password === undefined
          ) {
            throw new Error();
          } else {
            return Promise.resolve();
          }
        },
        users: {
          create: (_payload: any) => Promise.resolve({ id: keycloakId }),
          addRealmRoleMappings: (_payload: any) => Promise.resolve(),
        },
        roles: {
          findOneByName: (_payload: any) => Promise.resolve({}),
        },
      };
    }),
  };
});

describe('KeycloakService', () => {
  let keycloakService: KeycloakService;
  const authToken: AuthTokenModel = {
    tokenType: tokenResponse.token_type,
    accessToken: tokenResponse.access_token,
    accessTokenExpiresIn: tokenResponse.expires_in,
    refreshToken: tokenResponse.refresh_token,
    refreshTokenExpiresIn: tokenResponse.refresh_expires_in,
    scope: tokenResponse.scope,
  };

  beforeEach(async () => {
    keycloakService = new KeycloakService(
      new ConfigService(mockEmptyEnvironment),
      new HttpService(),
    );
  });

  it('should be defined', () => {
    expect(keycloakService).toBeDefined();
  });

  describe('requestTokenForCredentials', () => {
    it('should return token', () => {
      expect.assertions(1);
      const credentials: CredentialsDto = {
        username: 'test name',
        password: 'passw',
      };
      return expect(
        keycloakService.requestTokenForCredentials(credentials),
      ).resolves.toStrictEqual(authToken);
    });

    it('should throw error on empty credentials', () => {
      expect.assertions(1);
      return expect(
        keycloakService.requestTokenForCredentials(new CredentialsDto()),
      ).rejects.toThrowError(ApiException);
    });
  });

  describe('getUserInfoForToken', () => {
    it('should return UserInfo', () => {
      expect.assertions(1);
      return expect(
        keycloakService.getUserInfoForToken(authToken),
      ).resolves.toStrictEqual(keycloakUserInfo);
    });
  });

  describe('decodeToken', () => {
    it('should decode valid accessToken', () => {
      const auth: AuthTokenModel = {
        tokenType: '',
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        accessTokenExpiresIn: 100,
        refreshToken: '',
        refreshTokenExpiresIn: 100,
        scope: 'test',
      };
      const expected = {
        sub: '1234567890',
        iat: 1516239022,
        name: 'John Doe',
      };
      const result = keycloakService.decodeToken(auth);
      expect(result).toStrictEqual(expected);
    });

    it('should not decode invalid accessToken', () => {
      const auth: AuthTokenModel = {
        tokenType: '',
        accessToken: '',
        accessTokenExpiresIn: 100,
        refreshToken: '',
        refreshTokenExpiresIn: 100,
        scope: 'test',
      };
      const result = keycloakService.decodeToken(auth);
      expect(result).toBeNull();
    });
  });

  describe('registerDoctor', () => {
    it('should register', async () => {
      const credentials: CredentialsDto = {
        username: 'test',
        password: 'passw',
      };
      const result = await keycloakService.registerDoctor(credentials);
      expect(result).toStrictEqual(keycloakId);
    });

    // FIXME: Failed authorization depends on auth-method of KeycloakAdminClient, which behaviour still needs to be checked.
    it('should not register after failed authorization', async () => {
      fail();
    });
  });
});
