import { VersionableObject } from '@cancerlog/api/core';
import { ObjectType, Field } from '@nestjs/graphql';
import { FilterableField } from '@nestjs-query/query-graphql';

@ObjectType('Organization', {
  description: 'An Organization resource',
})
export class OrganizationObject extends VersionableObject {
  @FilterableField(() => String, {
    description: 'Name of the organization',
    nullable: false,
  })
  name!: string;

  @Field(() => String, {
    description: 'A description of this organization',
    nullable: false,
  })
  description!: string;

  @FilterableField(() => String, {
    description: 'Type (hospital, service center, ...) of the organization',
    nullable: false,
  })
  type!: string;

  @Field(() => String, {
    description: 'The address of this organization',
    nullable: true,
  })
  address!: string | null;

  @Field(() => String, {
    description: 'The phone number of this organization',
    nullable: true,
  })
  phone!: string | null;

  @Field(() => String, {
    description: 'An email address of this organization',
    nullable: true,
  })
  email!: string | null;

  @Field(() => String, {
    description: 'The URL / website of this organization',
    nullable: true,
  })
  url!: string | null;

  @Field(() => String, {
    description: 'The URL for the logo of this organization',
    nullable: true,
  })
  logo!: string | null;
}
