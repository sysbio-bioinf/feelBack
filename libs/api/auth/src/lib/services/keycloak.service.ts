import { ConfigService } from '@feelback-app/api/config';
import {
  EC_KEYCLOAK_REQUEST_TOKEN,
  EC_KEYCLOAK_RESOLVE_USER,
  ExceptionMessageModel,
} from '@feelback-app/api/errors';
import { RolesEnum } from '@feelback-app/api/interfaces';
import { KeycloakServiceConnection } from '@feelback-app/util/connection';
import {
  HttpService,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import KeycloakAdminClient from 'keycloak-admin';
import * as qs from 'qs';
import { map } from 'rxjs/operators';
import { CredentialsDto } from '../data/dtos/credentials.dto';
import { AuthTokenModel } from '../data/models/auth-token.model';
import { KeycloakJwtModel } from '../data/models/keycloak-jwt.model';
import { KeycloakUserInfo } from '../data/models/keycloak-userinfo.model';

@Injectable()
export class KeycloakService {
  private adminClient: KeycloakAdminClient;
  private realmName: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly http: HttpService,
  ) {
    this.adminClient = new KeycloakAdminClient({
      baseUrl: `${new KeycloakServiceConnection().getAddress()}/auth`,
    });

    this.realmName = this.configService.get('auth.keycloak.clients[0].realm');

    this.adminClient.auth({
      username: this.configService.get('auth.keycloak.host.username'),
      password: this.configService.get('auth.keycloak.host.password'),
      clientId: 'admin-cli',
      grantType: 'password',
    });
  }

  /**
   * Requests an Access Token from KeyCloak
   *
   * Returns a signed access token (JWT) from the keycloak server
   * in order to authenticate users interacting with the API.
   *
   * @param {CredentialsDto} credentials the credentials to sign in with
   * @returns {Promise<AuthTokenModel>}
   */
  async requestTokenForCredentials(
    credentials: CredentialsDto,
  ): Promise<AuthTokenModel> {
    try {
      const keycloakTokenAddress = new KeycloakServiceConnection().getTokenAddress(
        this.configService.get('auth.keycloak.clients[0].realm'),
      );

      const tokenResponse = await this.http
        .post(
          keycloakTokenAddress,
          qs.stringify({
            username: credentials.username,
            password: credentials.password,
            client_id: 'feelback-api-client',
            grant_type: 'password',
            scope: 'openid',
          }),
        )
        .pipe(map((response) => response))
        .toPromise();

      const token: AuthTokenModel = {
        tokenType: tokenResponse.data.token_type,
        accessToken: tokenResponse.data.access_token,
        accessTokenExpiresIn: tokenResponse.data.expires_in,
        refreshToken: tokenResponse.data.refresh_token,
        refreshTokenExpiresIn: tokenResponse.data.refresh_expires_in,
        scope: tokenResponse.data.scope,
      };

      return token;
    } catch (error) {
      throw new InternalServerErrorException({
        code: EC_KEYCLOAK_REQUEST_TOKEN.code,
        title: 'Keycloak Exception',
        message:
          'Error when trying to request an access token from the Keycloak Server',
        error: error,
        source: 'AuthService',
      } as ExceptionMessageModel);
    }
  }

  /**
   * Get the UserInfo from the KeyCloak server based on a given Access Token
   *
   * @param {AccessTokenObject} accessToken
   */
  async getUserInfoForToken(accessToken: AuthTokenModel) {
    try {
      const keycloakUserInfoAddress = new KeycloakServiceConnection().getUserInfoAddress(
        this.configService.get('auth.keycloak.clients[0].realm'),
      );

      const userResponse = await this.http
        .get<KeycloakUserInfo>(keycloakUserInfoAddress, {
          headers: {
            authorization: `Bearer ${accessToken.accessToken}`,
          },
        })
        .pipe(map((response) => response))
        .toPromise();

      const keycloakUserInfo: KeycloakUserInfo = userResponse.data;

      return keycloakUserInfo;
    } catch (error) {
      throw new InternalServerErrorException({
        code: EC_KEYCLOAK_RESOLVE_USER.code,
        message: 'Error when trying to resolve the user from Keycloak',
        title: 'Keycloak Exception',
        error: error,
        source: 'AuthService',
      } as ExceptionMessageModel);
    }
  }

  decodeToken(accessToken: AuthTokenModel) {
    return jwt.decode(accessToken.accessToken) as KeycloakJwtModel;
  }

  async registerDoctor(credentials: CredentialsDto): Promise<string> {
    const keycloakId = await this.adminClient.users.create({
      realm: this.realmName,
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
    });

    const managerRole = await this.adminClient.roles.findOneByName({
      name: RolesEnum.MANAGER,
      realm: this.realmName,
    });

    await this.adminClient.users.addRealmRoleMappings({
      id: keycloakId.id,
      roles: [
        {
          id: managerRole.id || '',
          name: managerRole.name || '',
        },
      ],
      realm: this.realmName,
    });

    return keycloakId.id;
  }
}
