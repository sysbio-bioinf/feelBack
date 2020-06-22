import { ConfigService } from '@cancerlog/api/config';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExceptionMessageModel, EC_GENERAL_ERROR } from '@cancerlog/api/errors';
import { User } from '../data/classes/user.class';

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

  async validate(jwtPayload: any, done: CallableFunction): Promise<any> {
    if (!jwtPayload) {
      return done(
        new InternalServerErrorException({
          message: 'Something went wrong... No payload found.',
          code: EC_GENERAL_ERROR.code,
        } as ExceptionMessageModel),
      );
    } else if (!jwtPayload.sub) {
      return done(null, false, 'No user id found.');
    }

    if (!jwtPayload.realm_access || !jwtPayload.realm_access.roles) {
      return done(
        null,
        new User(jwtPayload.sub),
        'Keycloak did not provide roles inside the JWT.',
      );
    }

    return done(null, new User(jwtPayload.sub, jwtPayload.realm_access.roles));
  }
}
