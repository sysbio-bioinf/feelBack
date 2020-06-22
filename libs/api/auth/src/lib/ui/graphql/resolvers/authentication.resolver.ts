import {
  EC_KEYCLOAK_REQUEST_TOKEN,
  ExceptionMessageModel,
} from '@cancerlog/api/errors';
import { LoginInput, TokenObject } from '@cancerlog/api/interfaces';
import { InternalServerErrorException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { KeycloakService } from '../../../services/keycloak.service';

@Resolver(() => TokenObject)
export class AuthenticationResolver {
  constructor(private keycloakService: KeycloakService) {}

  @Mutation(() => TokenObject, {
    description: 'login via username / password',
    nullable: false,
  })
  async login(@Args('input') input: LoginInput) {
    const token = await this.keycloakService.requestTokenForCredentials({
      username: input.email,
      password: input.password,
    });

    if (!token) {
      throw new InternalServerErrorException({
        code: EC_KEYCLOAK_REQUEST_TOKEN.code,
        title: 'JWT Token Exception',
        message: 'Could not request a Token from the Keycloak Server',
      } as ExceptionMessageModel);
    }

    const accessToken: TokenObject = {
      accessToken: token.accessToken,
      tokenType: token.tokenType,
      accessTokenExpiresIn: token.accessTokenExpiresIn,
      refreshToken: token.refreshToken,
      refreshTokenExpiresIn: token.refreshTokenExpiresIn,
      scope: token.scope,
    };
    return accessToken;
  }
}
