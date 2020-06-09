import { VersionableObject } from '@cancerlog/api/core';
import { ObjectType, GraphQLISODateTime, Field } from '@nestjs/graphql';
import { FilterableField } from '@nestjs-query/query-graphql';
import { JSONObject } from '@cancerlog/api/application';

@ObjectType('Screening', {
  description: 'A processed screening',
})
export class ScreeningObject extends VersionableObject {
  @FilterableField(() => String, {
    description: 'Instance ID (uuid v4) defined by the client',
    nullable: false,
  })
  instanceId!: string;

  @FilterableField(() => GraphQLISODateTime, {
    description: 'DateTime when this screening was performed.',
    nullable: false,
  })
  collectedAt!: Date;

  @FilterableField(() => String, {
    description: 'The language this screening was performed in',
    nullable: false,
  })
  language!: string;

  @Field(() => JSONObject, {
    description: 'the screening data (filled in questionnaires)',
    nullable: false,
  })
  payload!: object;

  @FilterableField(() => Boolean, {
    description: 'if the screening issues has been resolved',
    nullable: true,
  })
  isResolved!: boolean | null;

  @FilterableField(() => GraphQLISODateTime, {
    description: 'DateTime when the screening issues has been resolved.',
    nullable: true,
  })
  resolvedAt!: Date | null;

  @Field(() => String, {
    description: 'data about resolving the screening issues',
    nullable: true,
  })
  resolveComment!: string | null;
}
