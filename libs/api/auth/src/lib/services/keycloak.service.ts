import { ConfigService } from '@feelback-app/api/config';
import { ApiException } from '@feelback-app/api/errors';
import { RolesEnum } from '@feelback-app/api/shared';
import { KeycloakServiceConnection } from '@feelback-app/util/connection';
import { HttpService, HttpStatus, Injectable } from '@nestjs/common';
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
  constructor(
    private readonly configService: ConfigService,
    private readonly http: HttpService,
  ) {}

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
        this.configService.get('auth.keycloak.clients.feelback.realm'),
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
      throw new ApiException(
        {
          title: 'Keycloak Exception',
          message: 'Cannot request a token from the KeyCloak Server.',
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
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
        this.configService.get('auth.keycloak.clients.feelback.realm'),
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
      throw new ApiException(
        {
          title: 'KeyCloak Exception',
          message: 'Error when trying to resolve the User from KeyCloak',
          error: error,
          source: 'AuthService',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  decodeToken(accessToken: AuthTokenModel) {
    return jwt.decode(accessToken.accessToken) as KeycloakJwtModel;
  }

  async registerDoctor(credentials: CredentialsDto): Promise<string> {
    const adminClient = new KeycloakAdminClient({
      baseUrl: `${new KeycloakServiceConnection().getAddress()}/auth`,
    });

    const realmName = this.configService.get(
      'auth.keycloak.clients.feelback.realm',
    );

    await adminClient.auth({
      username: this.configService.get('auth.keycloak.server.username'),
      password: this.configService.get('auth.keycloak.server.password'),
      clientId: 'admin-cli',
      grantType: 'password',
    });

    if (!adminClient) {
      throw new ApiException(
        {
          title: 'Connection Error',
          message: 'Cannot connect to KeyCloak',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const keycloakId = await adminClient.users.create({
      realm: realmName,
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

    const managerRole = await adminClient.roles.findOneByName({
      name: RolesEnum.MANAGER,
      realm: realmName,
    });

    await adminClient.users.addRealmRoleMappings({
      id: keycloakId.id,
      roles: [
        {
          id: managerRole.id || '',
          name: managerRole.name || '',
        },
      ],
      realm: realmName,
    });

    return keycloakId.id;
  }
}
