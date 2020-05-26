import { KeycloakService } from '@cancerlog/api/authentication';
import { CoreException } from '@cancerlog/api/core';
import { LoginInput, TokenObject } from '@cancerlog/api/interfaces';
import { HttpStatus } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

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
      throw new CoreException(
        {
          detail: 'Could not return token',
          status: HttpStatus.INTERNAL_SERVER_ERROR,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
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
