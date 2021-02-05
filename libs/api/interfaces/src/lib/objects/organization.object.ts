import { VersionableObject } from '@feelback-app/api/core';
import {
  Connection,
  FilterableField
} from '@nestjs-query/query-graphql';
import { Field, ObjectType } from '@nestjs/graphql';
import { DoctorObject } from './doctor.object';
import { PersonObject } from './person.object';

@ObjectType('Organization', {
  description: 'An Organization resource',
})
@Connection('members', () => DoctorObject, {
  nullable: true,
  disableUpdate: false,
})
@Connection('people', () => PersonObject, {
  nullable: true,
  disableUpdate: false,
  relationName: 'persons',
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
