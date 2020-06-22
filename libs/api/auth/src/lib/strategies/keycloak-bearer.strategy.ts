import { ConfigService } from '@cancerlog/api/config';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

const KeycloakBearerStrategy = require('passport-keycloak-bearer');

@Injectable()
export class KeycloakStrategy extends PassportStrategy(
  KeycloakBearerStrategy,
  'keycloak-bearer',
) {
  constructor(private configService: ConfigService) {
    super({
      realm: configService.get('auth.keycloak.clients[0].realm'),
      url: 'http://keycloak:8080/auth',
    });
  }

  async validate(jwtPayload: any): Promise<any> {
    return jwtPayload;
  }
}
