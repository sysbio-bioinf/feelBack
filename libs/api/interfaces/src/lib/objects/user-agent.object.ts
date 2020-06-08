import { CoreObject } from '@cancerlog/api/core';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType('UserAgent', {})
export class UserAgentObject extends CoreObject {
  @Field({
    description: 'The device type used for this request',
    nullable: true,
  })
  device?: string;

  @Field({
    description: 'The OS used for this request',
    nullable: true,
  })
  os?: string;

  @Field({
    description: 'The application version used for this request',
    nullable: true,
  })
  application?: string;
}
