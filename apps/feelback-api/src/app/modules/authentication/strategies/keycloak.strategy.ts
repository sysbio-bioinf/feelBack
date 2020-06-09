import { KeycloakJwtModel } from '@cancerlog/api/authentication';
import { ConfigService } from '@cancerlog/api/config';
import {
  EC_AUTH_NOT_VERIFIED,
  EC_KEYCLOAK_INVALIDSIGNINGKEY,
  ExceptionMessageModel,
} from '@cancerlog/api/errors';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret, SigningKeyNotFoundError } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class KeycloakStrategy extends PassportStrategy(Strategy) {
  constructor(
    readonly configService: ConfigService,
    readonly authService: AuthenticationService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKeyProvider: passportJwtSecret(
        configService.get('auth.keycloak.config'),
      ),
      // @ts-ignore TODO
      handleSigningKeyError: (err, cb) => {
        if (err instanceof SigningKeyNotFoundError) {
          return cb(
            new UnauthorizedException({
              code: EC_KEYCLOAK_INVALIDSIGNINGKEY.code,
              title: 'Unauthorized',
              message: 'Signing Key was not found',
            } as ExceptionMessageModel),
          );
        }
        return cb(err);
      },

      // Validate the audience and the issuer.
      audience: configService.get('auth.keycloak.clients[0].audience'),
      issuer: `${configService.get(
        'auth.keycloak.host.url',
      )}auth/realms/${configService.get('auth.keycloak.clients[0].realm')}`,
      algorithm: ['RS256'],
    });
  }

  async validate(token: any, done: Function) {
    const keycloakJwtToken = token as KeycloakJwtModel;

    const account = await this.authService.findDoctorByKeycloakOrCreateNew(
      keycloakJwtToken,
    );

    // TODO: this should be typed. The type should be re-used for the JWT Guard!
    const mergedAccount = Object.assign({}, account, {
      email: keycloakJwtToken.email,
      username: keycloakJwtToken.preferred_username,
      isVerified: keycloakJwtToken.email_verified,
    });

    if (mergedAccount.isVerified !== true) {
      throw new UnauthorizedException({
        code: EC_AUTH_NOT_VERIFIED.code,
        title: 'Unauthorized',
        message: 'Account not verified',
      } as ExceptionMessageModel);
    }

    done(null, mergedAccount, { token });
  }
}
