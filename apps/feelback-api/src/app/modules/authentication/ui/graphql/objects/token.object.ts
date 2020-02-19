import { ObjectType, Field } from 'type-graphql';
import { CoreObject } from '@cancerlog/api/core';

@ObjectType('AccessToken')
export class TokenObject extends CoreObject {
  @Field({
    description: 'the generated access token to work with the api'
  })
  accessToken: string;

  @Field({
    description: 'the type of this token (e.g., BEARER)'
  })
  tokenType: string;

  @Field({
    description: 'indicates, how long this token is valid (value in seconds)'
  })
  accessTokenExpiresIn: number;

  @Field({
    description:
      'the generated refresh token that can be used to issue another access token'
  })
  refreshToken: string;

  @Field({
    description:
      'indicates, how long this refresh token is valid (value in seconds)'
  })
  refreshTokenExpiresIn: number;

  @Field({
    description: 'the scopes used within this token'
  })
  scope: string;
}
