import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpStatus } from '@nestjs/common';
import { passportJwtSecret, SigningKeyNotFoundError } from 'jwks-rsa';
import { AuthenticationService } from '../services/authentication.service';
import { ConfigService } from '@cancerlog/api/config';
import { CoreException } from '@cancerlog/api/core';
import { KeycloakJwtModel } from '@cancerlog/api/authentication';

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
      handleSigningKeyError: (err, cb) => {
        if (err instanceof SigningKeyNotFoundError) {
          return cb(
            new CoreException(
              {
                status: HttpStatus.UNAUTHORIZED,
                detail: 'Signing Key not found',
              },
              HttpStatus.UNAUTHORIZED,
            ),
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
      throw new CoreException(
        {
          detail: 'Account not verified',
        },
        HttpStatus.PRECONDITION_FAILED,
      );
    }

    done(null, mergedAccount, { token });
  }
}
