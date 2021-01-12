import { ApiException } from '@feelback-app/api/errors';
import { LoginInput, TokenObject } from '@feelback-app/api/interfaces';
import { HttpStatus } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Unprotected } from '../../../decorators/unprotected.decorator';
import { KeycloakService } from '../../../services/keycloak.service';

@Resolver(() => TokenObject)
export class AuthenticationResolver {
  constructor(private keycloakService: KeycloakService) {}

  @Mutation(() => TokenObject, {
    description: 'login via username / password',
    nullable: false,
  })
  @Unprotected()
  async login(@Args('input') input: LoginInput) {
    const token = await this.keycloakService.requestTokenForCredentials({
      username: input.email,
      password: input.password,
    });

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
