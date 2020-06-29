import { CoreModel } from '@feelback-app/api/core';

export interface KeycloakUserInfo extends CoreModel {
  sub: string;

  email: string;
  email_verified: boolean;
  preferred_username: string;

  given_name?: string;
  familiy_name?: string;

  roles: string[];
}
