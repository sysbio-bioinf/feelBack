import { ObjectType, Field } from 'type-graphql';
import { VersionableObject } from '@cancerlog/api/core';
import { FilterableField } from '@nestjs-query/query-graphql';

@ObjectType('Identity', {
  description: 'Identity resource for an anonymized patient'
})
export class IdentityObject extends VersionableObject {
  @FilterableField({
    description: 'The pseudonym of an identity.'
  })
  pseudonym: string;

  @Field({
    description: 'An academic title of this identity',
    nullable: true
  })
  title?: string;

  @Field({
    description: 'The firstname of this identity',
    nullable: true
  })
  firstname?: string;

  @Field({
    description: 'The lastname of this identity',
    nullable: true
  })
  lastname?: string;
}
