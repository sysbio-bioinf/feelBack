import { VersionableObject } from '@feelback-app/api/core';
import { FilterableField } from '@nestjs-query/query-graphql';
import { ObjectType } from '@nestjs/graphql';

@ObjectType('Faq', {
  description: 'A FAQ entry',
})
export class FaqObject extends VersionableObject {
  @FilterableField(() => String, {
    description: 'the question of this FAQ entry',
    nullable: false,
  })
  question!: string;

  @FilterableField(() => String, {
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
