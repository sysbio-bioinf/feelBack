import { Injectable, HttpStatus, HttpService } from '@nestjs/common';
import { ConfigService } from '@cancerlog/api/config';
import { CoreException } from '@cancerlog/api/core';
import { map } from 'rxjs/operators';
import * as qs from 'qs';
import * as jwt from 'jsonwebtoken';
import { CredentialsDto } from '../data/dtos/credentials.dto';
import { AuthTokenModel } from '../data/models/auth-token.model';
import { KeycloakUserInfo } from '../data/models/keycloak-userinfo.model';
import { KeycloakJwtModel } from '../data/models/keycloak-jwt.model';
import { KeycloakServiceConnection } from '@cancerlog/util/connection';

@Injectable()
export class KeycloakService {
  constructor(
    private readonly config: ConfigService,
    private readonly http: HttpService,
  ) {}

  /**
   * Requests an Access Token from KeyCloak
   *
   * Returns a signed access token (JWT) from the keycloak server in order to authenticate users interacting with the API.
   *
   * @param {CredentialsDto} credentials the credentials to sign in with
   * @returns {Promise<AuthTokenModel>}
   */
  async requestTokenForCredentials(
    credentials: CredentialsDto,
  ): Promise<AuthTokenModel> {
    try {
      const keycloakAddress = new KeycloakServiceConnection().getAddress();
      const tokenResponse = await this.http
        .post(
          `${keycloakAddress}/token`,
          qs.stringify({
            username: credentials.username,
            password: credentials.password,
            client_id: 'feelback-api-client',
            grant_type: 'password',
            scope: 'openid',
          }),
        )
        .pipe(map(response => response))
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
      throw new CoreException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          detail: 'Error when trying to request an access token from KeyCloak',
          debug: {
            location: 'AuthService',
          },
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
      const userResponse = await this.http
        .get<KeycloakUserInfo>(
          `${this.config.getKeyCloakUriForRealm(
            this.config.get('auth.keycloak.clients[0].realm'),
          )}protocol/openid-connect/userinfo`,
          {
            headers: {
              authorization: `Bearer ${accessToken.accessToken}`,
            },
          },
        )
        .pipe(map(response => response))
        .toPromise();

      const keycloakUserInfo: KeycloakUserInfo = userResponse.data;

      return keycloakUserInfo;
    } catch (error) {
      throw new CoreException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          detail: 'Error when trying to resolve user from KeyCloak',
          debug: {
            location: 'AuthService',
          },
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  decodeToken(accessToken: AuthTokenModel) {
    return jwt.decode(accessToken.accessToken) as KeycloakJwtModel;
  }
}
