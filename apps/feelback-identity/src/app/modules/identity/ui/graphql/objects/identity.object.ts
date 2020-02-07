import { ObjectType } from 'type-graphql';
import { VersionableObject } from '@cancerlog/api/core';
import { FilterableField } from '@nestjs-query/query-graphql';

@ObjectType('Identity')
export class IdentityObject extends VersionableObject {
  @FilterableField()
  pseudonym: string;

  @FilterableField({ nullable: true })
  title: string;

  @FilterableField({ nullable: true })
  firstname: string;

  @FilterableField({ nullable: true })
  lastname: string;
}
