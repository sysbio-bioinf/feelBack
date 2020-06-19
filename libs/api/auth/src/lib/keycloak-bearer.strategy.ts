import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
const KeycloakBearerStrategy = require('passport-keycloak-bearer');

@Injectable()
export class KeycloakStrategy extends PassportStrategy(
  KeycloakBearerStrategy,
  'keycloak-bearer',
) {
  constructor() {
    super({
      realm: 'feelback',
      url: 'http://keycloak:8080/auth',
    });
  }

  async validate(jwtPayload: any): Promise<any> {
    console.log(jwtPayload);
    return jwtPayload;
  }
}
