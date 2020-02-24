import { ObjectType, Field } from 'type-graphql';
import { VersionableObject } from '@cancerlog/api/core';
import { FilterableField } from '@nestjs-query/query-graphql';

@ObjectType('Person', {
  description: 'A person',
})
export class PersonObject extends VersionableObject {
  @FilterableField({
    description: 'the pseudonym of the person',
    nullable: false,
  })
  pseudonym: string;

  @Field({
    description: 'indicates if the TOS were accepted',
    nullable: false,
  })
  acceptedTOS: boolean;
}
