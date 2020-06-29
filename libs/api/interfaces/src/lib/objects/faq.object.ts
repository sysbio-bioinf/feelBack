import { ObjectType, Field } from '@nestjs/graphql';
import { VersionableObject } from '@feelback-app/api/core';
import { FilterableField } from '@nestjs-query/query-graphql';

@ObjectType('Faq', {
  description: 'A FAQ entry',
})
export class FaqObject extends VersionableObject {
  @Field(() => String, {
    description: 'the question of this FAQ entry',
    nullable: false,
  })
  question!: string;

  @Field(() => String, {
    description: 'the answer to this question',
    nullable: false,
  })
  answer!: string;

  @FilterableField(() => Boolean, {
    description: 'indicates if this FAQ entry is active an can be displayed',
    nullable: false,
  })
  isActive!: boolean;
}
