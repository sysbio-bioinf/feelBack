import { VersionableObject } from '@cancerlog/api/core';
import { ObjectType, GraphQLISODateTime, Field } from 'type-graphql';
import { FilterableField } from '@nestjs-query/query-graphql';
import { InstrumentObject } from '../../../../instrument/ui/graphql/objects/instrument.object';

@ObjectType('Screening', {
  description: 'A processed screening'
})
export class ScreeningObject extends VersionableObject {
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

  // @Field({
  //   description: 'The instrument this screening belongs to',
  //   nullable: true
  // })
  // instrument: InstrumentObject;
}
