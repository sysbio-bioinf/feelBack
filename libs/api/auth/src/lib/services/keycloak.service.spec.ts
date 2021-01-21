import { KeycloakService } from './keycloak.service';
import { ConfigService } from '@feelback-app/api/config';
import { RolesEnum } from '@feelback-app/api/shared';
import { mockEmptyEnvironment } from '@feelback-app/api/testing';
import { KeycloakServiceConnection } from '@feelback-app/util/connection';
import { HttpService } from '@nestjs/common';
import { CredentialsDto } from '../data/dtos/credentials.dto';
import { AuthTokenModel } from '../data/models/auth-token.model';
import { ApiException } from '@feelback-app/api/errors';
import { of } from 'rxjs';
import { KeycloakUserInfo } from '../data/models/keycloak-userinfo.model';
import RoleRepresentation from 'keycloak-admin/lib/defs/roleRepresentation';

type UsersCreateType = { id: string };

// Mock KeycloakAdminClient and its needed methods
const mockAdminClientAuth: jest.Mock<Promise<void>> = jest.fn();
const mockAdminClientUsersCreate: jest.Mock<Promise<
  UsersCreateType
>> = jest.fn();
const mockAdminClientUsersAddRealmRoleMappings: jest.Mock<Promise<
  void
>> = jest.fn();
const mockAdminClientRolesFindOneByName: jest.Mock<Promise<
  RoleRepresentation
>> = jest.fn();
jest.mock('keycloak-admin/lib', () => {
  return {
    __esModule: true,
    default: jest.fn((_cfg: any) => {
      return {
        auth: mockAdminClientAuth,
        users: {
          create: mockAdminClientUsersCreate,
          addRealmRoleMappings: mockAdminClientUsersAddRealmRoleMappings,
        },
        roles: {
          findOneByName: mockAdminClientRolesFindOneByName,
        },
      };
    }),
  };
});

const configGetResult = 'Test realmName';
const mockConfigServiceGet: jest.Mock<any> = jest
  .fn()
  .mockReturnValue(configGetResult);
// Mock ConfigService to avoid logging in constructor
jest.mock('@feelback-app/api/config', () => {
  return {
    ConfigService: jest.fn().mockImplementation((_cfg) => {
      return {
        get: mockConfigServiceGet,
      };
    }),
  };
});

// Mock methods for HttpService
const mockHttpGet = jest.fn();
const mockHttpPost = jest.fn();

describe('KeycloakService', () => {
  let keycloakService: KeycloakService;
  // Function to generate AxiosResponse-Object for HttpService-Mock methods
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
  // Result of valid use of mockHttpGet, if it doesn't fail
  const tokenResponse = {
    token_type: 'token_type',
    access_token: 'access_token',
    expires_in: 100,
    refresh_token: 'refresh_token',
    refresh_expires_in: 50,
    scope: 'scope',
  };
  const authToken: AuthTokenModel = {
    tokenType: tokenResponse.token_type,
    accessToken: tokenResponse.access_token,
    accessTokenExpiresIn: tokenResponse.expires_in,
    refreshToken: tokenResponse.refresh_token,
    refreshTokenExpiresIn: tokenResponse.refresh_expires_in,
    scope: tokenResponse.scope,
  };

  const expectedRealmNameConfigPath = 'auth.keycloak.clients.feelback.realm';

  beforeEach(async () => {
    jest.clearAllMocks();
    const httpService = new HttpService();
    httpService.post = mockHttpPost;
    httpService.get = mockHttpGet;

    keycloakService = new KeycloakService(
      new ConfigService(mockEmptyEnvironment),
      httpService,
    );
  });

  it('should be defined', () => {
    expect(keycloakService).toBeDefined();
  });

  describe('requestTokenForCredentials', () => {
    const credentials: CredentialsDto = {
      username: 'testName',
      password: 'passw',
    };
    const keycloakTokenAddress = new KeycloakServiceConnection().getTokenAddress(
      configGetResult,
    );
    const httpPostData = `username=${credentials.username}&password=${credentials.password}&client_id=feelback-api-client&grant_type=password&scope=openid`;

    it('should return token', async () => {
      mockHttpPost.mockReturnValueOnce(
        of(generateAxiosResponse(tokenResponse)),
      );
      expect.assertions(5);
      const result = await keycloakService.requestTokenForCredentials(
        credentials,
      );
      expect(result).toStrictEqual(authToken);
      expect(mockConfigServiceGet).toBeCalledTimes(1);
      expect(mockConfigServiceGet).toBeCalledWith(expectedRealmNameConfigPath);
      expect(mockHttpPost).toBeCalledTimes(1);
      expect(mockHttpPost).toBeCalledWith(keycloakTokenAddress, httpPostData);
    });

    it('should throw error on empty credentials', async () => {
      mockHttpPost.mockImplementationOnce(() => {
        throw new Error();
      });
      expect.assertions(5);
      try {
        await keycloakService.requestTokenForCredentials(credentials);
        fail();
      } catch (error) {
        expect(error).toBeInstanceOf(ApiException);
      }
      expect(mockConfigServiceGet).toBeCalledTimes(1);
      expect(mockConfigServiceGet).toBeCalledWith(expectedRealmNameConfigPath);
      expect(mockHttpPost).toBeCalledTimes(1);
      expect(mockHttpPost).toBeCalledWith(keycloakTokenAddress, httpPostData);
    });
  });

  describe('getUserInfoForToken', () => {
    const keycloakUserInfoAddress = new KeycloakServiceConnection().getUserInfoAddress(
      configGetResult,
    );
    const authorizationHeader = {
      headers: {
        authorization: `Bearer ${authToken.accessToken}`,
      },
    };

    it('should throw error if HTTP-GET fails', async () => {
      mockHttpGet.mockImplementationOnce(() => {
        throw new Error();
      });
      expect.assertions(5);
      try {
        await keycloakService.getUserInfoForToken(authToken);
        fail();
      } catch (error) {
        expect(error).toBeInstanceOf(ApiException);
      }
      expect(mockConfigServiceGet).toBeCalledTimes(1);
      expect(mockConfigServiceGet).toBeCalledWith(expectedRealmNameConfigPath);
      expect(mockHttpGet).toBeCalledTimes(1);
      expect(mockHttpGet).toBeCalledWith(
        keycloakUserInfoAddress,
        authorizationHeader,
      );
    });

    // Result of mockHttpGet, if it doesn't fail
    const keycloakUserInfo: KeycloakUserInfo = {
      sub: 'sub',
      email: 'email',
      email_verified: true,
      preferred_username: 'preferred_username',
      roles: [],
    };

    it('should return UserInfo', async () => {
      mockHttpGet.mockReturnValueOnce(
        of(generateAxiosResponse(keycloakUserInfo)),
      );
      expect.assertions(5);
      const result = await keycloakService.getUserInfoForToken(authToken);
      expect(result).toStrictEqual(keycloakUserInfo);
      expect(mockConfigServiceGet).toBeCalledTimes(1);
      expect(mockConfigServiceGet).toBeCalledWith(expectedRealmNameConfigPath);
      expect(mockHttpGet).toBeCalledTimes(1);
      expect(mockHttpGet).toBeCalledWith(
        keycloakUserInfoAddress,
        authorizationHeader,
      );
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
    const keycloakId = { id: 'keycloakId' };

    const expectedUsernameConfigPath = 'auth.keycloak.server.username';
    const expectedPasswordConfigPath = 'auth.keycloak.server.password';

    const expectedCredentials = {
      username: configGetResult,
      password: configGetResult,
      clientId: 'admin-cli',
      grantType: 'password',
    };

    const generateUserRepresentation = (credentials: CredentialsDto) => {
      return {
        realm: configGetResult,
        emailVerified: true,
        enabled: true,
        email: credentials.username,
        username: credentials.username,
        credentials: [
          {
            type: 'password',
            value: credentials.password,
          },
        ],
      };
    };

    const expectedRole = {
      name: RolesEnum.MANAGER,
      realm: configGetResult,
    };

    const generatePayload = (managerRole: RoleRepresentation) => {
      return {
        id: keycloakId.id,
        roles: [
          {
            id: managerRole.id,
            name: managerRole.name,
          },
        ],
        realm: configGetResult,
      };
    };

    const credentials: CredentialsDto = {
      username: 'test',
      password: 'passw',
    };

    it('should register', async () => {
      // Set mocks
      mockAdminClientUsersCreate.mockResolvedValueOnce(keycloakId);
      const managerRole: RoleRepresentation = {
        id: 'manageRoleId',
        name: 'manager role',
      };
      mockAdminClientRolesFindOneByName.mockResolvedValueOnce(managerRole);
      // Call method
      const result = await keycloakService.registerDoctor(credentials);
      // Expect
      expect(result).toStrictEqual(keycloakId.id);
      expect(mockConfigServiceGet).toBeCalledTimes(3);
      expect(mockConfigServiceGet).toBeCalledWith(expectedRealmNameConfigPath);
      expect(mockConfigServiceGet).toBeCalledWith(expectedUsernameConfigPath);
      expect(mockConfigServiceGet).toBeCalledWith(expectedPasswordConfigPath);
      expect(mockAdminClientAuth).toBeCalledTimes(1);
      expect(mockAdminClientAuth).toBeCalledWith(expectedCredentials);
      expect(mockAdminClientUsersCreate).toBeCalledTimes(1);
      const expectedUserRepresentation = generateUserRepresentation(
        credentials,
      );
      expect(mockAdminClientUsersCreate).toBeCalledWith(
        expectedUserRepresentation,
      );
      expect(mockAdminClientRolesFindOneByName).toBeCalledTimes(1);
      expect(mockAdminClientRolesFindOneByName).toBeCalledWith(expectedRole);
      expect(mockAdminClientUsersAddRealmRoleMappings).toBeCalledTimes(1);
      const expectedPayload = generatePayload(managerRole);
      expect(mockAdminClientUsersAddRealmRoleMappings).toBeCalledWith(
        expectedPayload,
      );
    });

    it('should register if manager role is empty', async () => {
      // Set mocks
      mockAdminClientUsersCreate.mockResolvedValueOnce(keycloakId);
      mockAdminClientRolesFindOneByName.mockResolvedValueOnce({});
      // Call method
      const result = await keycloakService.registerDoctor(credentials);
      // Expect
      expect(result).toStrictEqual(keycloakId.id);
      expect(mockConfigServiceGet).toBeCalledTimes(3);
      expect(mockConfigServiceGet).toBeCalledWith(expectedRealmNameConfigPath);
      expect(mockConfigServiceGet).toBeCalledWith(expectedUsernameConfigPath);
      expect(mockConfigServiceGet).toBeCalledWith(expectedPasswordConfigPath);
      expect(mockAdminClientAuth).toBeCalledTimes(1);
      expect(mockAdminClientAuth).toBeCalledWith(expectedCredentials);
      expect(mockAdminClientUsersCreate).toBeCalledTimes(1);
      const expectedUserRepresentation = generateUserRepresentation(
        credentials,
      );
      expect(mockAdminClientUsersCreate).toBeCalledWith(
        expectedUserRepresentation,
      );
      expect(mockAdminClientRolesFindOneByName).toBeCalledTimes(1);
      expect(mockAdminClientRolesFindOneByName).toBeCalledWith(expectedRole);
      expect(mockAdminClientUsersAddRealmRoleMappings).toBeCalledTimes(1);
      const emptyManagerRole = {
        id: '',
        name: '',
      };
      const expectedPayload = generatePayload(emptyManagerRole);
      expect(mockAdminClientUsersAddRealmRoleMappings).toBeCalledWith(
        expectedPayload,
      );
    });

    it('should not register if keycloakId is falsy', async () => {
      mockAdminClientUsersCreate.mockResolvedValueOnce(
        (null as unknown) as UsersCreateType,
      );
      expect.assertions(11);
      // Call method
      try {
        await keycloakService.registerDoctor(credentials);
        fail(); // Make sure error gets thrown
      } catch (error) {
        // Expect
        expect(error).toBeInstanceOf(ApiException);
      }
      expect(mockConfigServiceGet).toBeCalledTimes(3);
      expect(mockConfigServiceGet).toBeCalledWith(expectedRealmNameConfigPath);
      expect(mockConfigServiceGet).toBeCalledWith(expectedUsernameConfigPath);
      expect(mockConfigServiceGet).toBeCalledWith(expectedPasswordConfigPath);
      expect(mockAdminClientAuth).toBeCalledTimes(1);
      expect(mockAdminClientAuth).toBeCalledWith(expectedCredentials);
      expect(mockAdminClientUsersCreate).toBeCalledTimes(1);
      const expectedUserRepresentation = generateUserRepresentation(
        credentials,
      );
      expect(mockAdminClientUsersCreate).toBeCalledWith(
        expectedUserRepresentation,
      );
      expect(mockAdminClientRolesFindOneByName).toBeCalledTimes(0);
      expect(mockAdminClientUsersAddRealmRoleMappings).toBeCalledTimes(0);
    });

    it('should not register if keycloakId.id is undefined', async () => {
      mockAdminClientUsersCreate.mockResolvedValueOnce({} as UsersCreateType);
      expect.assertions(11);
      // Call method
      try {
        await keycloakService.registerDoctor(credentials);
        fail(); // Make sure error gets thrown
      } catch (error) {
        // Expect
        expect(error).toBeInstanceOf(ApiException);
      }
      expect(mockConfigServiceGet).toBeCalledTimes(3);
      expect(mockConfigServiceGet).toBeCalledWith(expectedRealmNameConfigPath);
      expect(mockConfigServiceGet).toBeCalledWith(expectedUsernameConfigPath);
      expect(mockConfigServiceGet).toBeCalledWith(expectedPasswordConfigPath);
      expect(mockAdminClientAuth).toBeCalledTimes(1);
      expect(mockAdminClientAuth).toBeCalledWith(expectedCredentials);
      expect(mockAdminClientUsersCreate).toBeCalledTimes(1);
      const expectedUserRepresentation = generateUserRepresentation(
        credentials,
      );
      expect(mockAdminClientUsersCreate).toBeCalledWith(
        expectedUserRepresentation,
      );
      expect(mockAdminClientRolesFindOneByName).toBeCalledTimes(0);
      expect(mockAdminClientUsersAddRealmRoleMappings).toBeCalledTimes(0);
    });

    it('should not register if manager role is falsy', async () => {
      mockAdminClientUsersCreate.mockResolvedValueOnce(keycloakId);
      mockAdminClientRolesFindOneByName.mockResolvedValue(
        (null as unknown) as RoleRepresentation,
      );
      expect.assertions(12);
      // Call method
      try {
        await keycloakService.registerDoctor(credentials);
        fail(); // Make sure error gets thrown
      } catch (error) {
        // Expect
        expect(error).toBeInstanceOf(ApiException);
      }
      expect(mockConfigServiceGet).toBeCalledTimes(3);
      expect(mockConfigServiceGet).toBeCalledWith(expectedRealmNameConfigPath);
      expect(mockConfigServiceGet).toBeCalledWith(expectedUsernameConfigPath);
      expect(mockConfigServiceGet).toBeCalledWith(expectedPasswordConfigPath);
      expect(mockAdminClientAuth).toBeCalledTimes(1);
      expect(mockAdminClientAuth).toBeCalledWith(expectedCredentials);
      expect(mockAdminClientUsersCreate).toBeCalledTimes(1);
      const expectedUserRepresentation = generateUserRepresentation(
        credentials,
      );
      expect(mockAdminClientUsersCreate).toBeCalledWith(
        expectedUserRepresentation,
      );
      expect(mockAdminClientRolesFindOneByName).toBeCalledTimes(1);
      expect(mockAdminClientRolesFindOneByName).toBeCalledWith(expectedRole);
      expect(mockAdminClientUsersAddRealmRoleMappings).toBeCalledTimes(0);
    });
  });
});
