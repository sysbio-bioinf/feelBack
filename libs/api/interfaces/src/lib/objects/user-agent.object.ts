import { CoreObject } from '@feelback-app/api/core';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType('UserAgent', {})
export class UserAgentObject extends CoreObject {
  @Field(() => String, {
    description: 'The device type used for this request',
    nullable: true,
  })
  device!: string | null;

  @Field(() => String, {
    description: 'The OS used for this request',
    nullable: true,
  })
  os!: string | null;

  @Field(() => String, {
    description: 'The application version used for this request',
    nullable: true,
  })
  application!: string | null;
}
