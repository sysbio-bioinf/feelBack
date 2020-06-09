import { ObjectType, Field } from '@nestjs/graphql';
import { VersionableObject } from '@cancerlog/api/core';
import { FilterableField } from '@nestjs-query/query-graphql';

@ObjectType('Identity', {
  description: 'Identity resource for an anonymized patient',
})
export class IdentityObject extends VersionableObject {
  @FilterableField(() => String, {
    description: 'The pseudonym of an identity.',
    nullable: false,
  })
  pseudonym!: string;

  @Field(() => String, {
    description: 'An academic title of this identity',
    nullable: true,
  })
  title!: string | null;

  @FilterableField(() => String, {
    description: 'The firstname of this identity',
    nullable: true,
  })
  firstname!: string | null;

  @FilterableField(() => String, {
    description: 'The lastname of this identity',
    nullable: true,
  })
  lastname!: string | null;
}
