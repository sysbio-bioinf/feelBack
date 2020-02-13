import { VersionableObject } from '@cancerlog/api/core';
import { ObjectType, Field } from 'type-graphql';
import { FilterableField } from '@nestjs-query/query-graphql';

@ObjectType('Organization', {
  description: 'An Organization resource'
})
export class OrganizationObject extends VersionableObject {
  @FilterableField({
    description: 'Name of the organization'
  })
  name: string;

  @Field({
    description: 'A description of this organization',
    nullable: true
  })
  description?: string;

  @FilterableField({
    description: 'Type (hospital, service center, ...) of the organization'
  })
  type: string;

  @Field({
    description: 'The address of this organization',
    nullable: true
  })
  address?: string;

  @Field({
    description: 'The phone number of this organization',
    nullable: true
  })
  phone?: string;

  @Field({
    description: 'An email address of this organization',
    nullable: true
  })
  email?: string;

  @Field({
    description: 'The URL / website of this organization',
    nullable: true
  })
  url?: string;

  @Field({
    description: 'The URL for the logo of this organization',
    nullable: true
  })
  logo?: string;
}
