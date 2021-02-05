import { VersionableObject } from '@feelback-app/api/core';
import { Connection, FilterableField } from '@nestjs-query/query-graphql';
import { Field, ObjectType } from '@nestjs/graphql';
import { OrganizationObject } from './organization.object';

@ObjectType('Person', {
  description: 'A person',
})
@Connection('organizations', () => OrganizationObject, {
  relationName: 'organizations',
  disableRead: true,
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
