import { KeycloakUserInfo } from './keycloak-userinfo.model';

export interface KeycloakJwtModel extends KeycloakUserInfo {
  jti: string;
  iss: string;
  aud: string[];
  typ: string;
  azp: string;
  scope: string;

  [k: string]: any;
}
