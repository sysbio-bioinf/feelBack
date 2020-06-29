import { ObjectType, Field } from '@nestjs/graphql';
import { VersionableObject } from '@feelback-app/api/core';
import { FilterableField } from '@nestjs-query/query-graphql';

@ObjectType('Person', {
  description: 'A person',
})
export class PersonObject extends VersionableObject {
  @FilterableField(() => String, {
    description: 'the pseudonym of the person',
    nullable: false,
  })
  pseudonym!: string;

  @Field(() => Boolean, {
    description: 'indicates if the TOS were accepted',
    nullable: false,
  })
  acceptedTOS!: boolean;
}
