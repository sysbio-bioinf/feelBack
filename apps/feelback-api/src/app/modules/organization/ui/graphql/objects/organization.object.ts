import { VersionableObject } from '@cancerlog/api/core';
import { ObjectType, Field } from 'type-graphql';
import { FilterableField } from '@nestjs-query/query-graphql';

@ObjectType('Organization')
export class OrganizationObject extends VersionableObject {
  @FilterableField()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  url?: string;

  @Field({ nullable: true })
  logo?: string;
}
