import { ConfigService } from '@cancerlog/api/config';
import {
  EC_KEYCLOAK_REQUEST_TOKEN,
  EC_KEYCLOAK_RESOLVE_USER,
  ExceptionMessageModel,
} from '@cancerlog/api/errors';
import { KeycloakServiceConnection } from '@cancerlog/util/connection';
import {
  HttpService,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as qs from 'qs';
import { map } from 'rxjs/operators';
import { CredentialsDto } from '../data/dtos/credentials.dto';
import { AuthTokenModel } from '../data/models/auth-token.model';
import { KeycloakJwtModel } from '../data/models/keycloak-jwt.model';
import { KeycloakUserInfo } from '../data/models/keycloak-userinfo.model';

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
      // TODO remove magic string
      const keycloakTokenAddress = new KeycloakServiceConnection().getTokenAddress(
        'feelback',
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
      // TODO remove magic string
      const keycloakUserInfoAddress = new KeycloakServiceConnection().getUserInfoAddress(
        'feelback',
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
}
