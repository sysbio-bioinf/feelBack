import { ObjectType, Field } from '@nestjs/graphql';
import { CoreObject } from '@cancerlog/api/core';

@ObjectType('AccessToken')
export class TokenObject extends CoreObject {
  @Field({
    description: 'the generated access token to work with the api',
    nullable: false,
  })
  accessToken!: string;

  @Field({
    description: 'the type of this token (e.g., BEARER)',
    nullable: false,
  })
  tokenType!: string;

  @Field({
    description: 'indicates, how long this token is valid (value in seconds)',
    nullable: false,
  })
  accessTokenExpiresIn!: number;

  @Field({
    description:
      'the generated refresh token that can be used to issue another access token',
    nullable: false,
  })
  refreshToken!: string;

  @Field({
    description:
      'indicates, how long this refresh token is valid (value in seconds)',
    nullable: false,
  })
  refreshTokenExpiresIn!: number;

  @Field({
    description: 'the scopes used within this token',
    nullable: false,
  })
  scope!: string;
}
