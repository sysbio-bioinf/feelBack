import { CoreModel } from '@cancerlog/api/core';

export interface AuthTokenModel extends CoreModel {
  tokenType: string;
  accessToken: string;
  accessTokenExpiresIn: number;
  refreshToken: string;
  refreshTokenExpiresIn: number;
  scope: string;
}
