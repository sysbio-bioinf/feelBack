import { VersionableObject } from '@cancerlog/api/core';
import { ObjectType, GraphQLISODateTime, Field } from 'type-graphql';
import { FilterableField } from '@nestjs-query/query-graphql';

@ObjectType('Screening', {
  description: 'A processed screening'
})
export class ScreeningObject extends VersionableObject {
  @FilterableField({
    description: 'Instance ID (uuid v4) defined by the client',
    nullable: false
  })
  instanceId: string;

  @FilterableField(() => GraphQLISODateTime, {
    description: 'DateTime when this screening was performed.',
    nullable: false
  })
  collectedAt: Date;

  @FilterableField({
    description: 'The language this screening was performed in',
    nullable: false
  })
  language: string;
}
