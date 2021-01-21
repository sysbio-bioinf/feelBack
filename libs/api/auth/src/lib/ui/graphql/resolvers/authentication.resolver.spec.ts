import { AuthenticationResolver } from './authentication.resolver';
import { TestingModule, Test } from '@nestjs/testing';
import { KeycloakService } from '../../../services/keycloak.service';
import { ConfigModule } from '@feelback-app/api/config';
import { mockEmptyEnvironment } from '@feelback-app/api/testing';
import { HttpModule } from '@nestjs/common';
import { AuthTokenModel } from '../../../data/models/auth-token.model';
import { CredentialsDto } from '../../../data/dtos/credentials.dto';
import { LoginInput } from '@feelback-app/api/interfaces';

// Mock for KeycloakService.requestTokenForCredential
const mockRequestToken: jest.Mock<Promise<AuthTokenModel>> = jest.fn();

describe('AuthenticationResolver', () => {
  let resolver: AuthenticationResolver;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(mockEmptyEnvironment), HttpModule],
      providers: [AuthenticationResolver, KeycloakService],
    }).compile();

    resolver = module.get<AuthenticationResolver>(AuthenticationResolver);

    const keycloakService = module.get<KeycloakService>(KeycloakService);
    keycloakService.requestTokenForCredentials = mockRequestToken;
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  const input: LoginInput = {
    email: 'test@uni-ulm.de',
    password: 'passw',
  };
  const expectedCredentials: CredentialsDto = {
    username: input.email,
    password: input.password,
  };
  const authTokenModel: AuthTokenModel = {
    tokenType: 'token type',
    accessToken: 'access token',
    accessTokenExpiresIn: 500,
    refreshToken: 'refresh token',
    refreshTokenExpiresIn: 300,
    scope: 'scope',
  };

  describe('login', () => {
    it('should return token object', async () => {
      mockRequestToken.mockResolvedValueOnce(authTokenModel);
      const result = await resolver.login(input);
      expect(result).toStrictEqual({ ...authTokenModel });
      expect(mockRequestToken).toBeCalledTimes(1);
      expect(mockRequestToken).toBeCalledWith(expectedCredentials);
    });
  });
});
