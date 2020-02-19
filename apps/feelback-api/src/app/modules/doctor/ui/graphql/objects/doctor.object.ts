import { ObjectType, Field } from 'type-graphql';
import { VersionableObject } from '@cancerlog/api/core';
import { FilterableField } from '@nestjs-query/query-graphql';
import { JSONObject } from '@cancerlog/api/application';

@ObjectType('Doctor', {
  description: 'A Doctor, Psychologist or Caregiver'
})
export class DoctorObject extends VersionableObject {
  @Field({
    description: '(Academic) title of this doctor',
    nullable: true
  })
  title?: string;

  @FilterableField({
    description: 'Firstname of this doctor',
    nullable: true
  })
  firstname?: string;

  @FilterableField({
    description: 'Lastname of this doctor',
    nullable: true
  })
  lastname?: string;

  @Field({
    description: 'The phone number of this doctor',
    nullable: true
  })
  phone?: string;

  @Field({
    description: 'An email address of this doctor',
    nullable: true
  })
  email?: string;

  @Field({
    description: 'The URL / website of this doctor',
    nullable: true
  })
  url?: string;

  @Field({
    description: 'The URL for the picture of this doctor',
    nullable: true
  })
  picture?: string;

  @Field({
    description: 'Settings for this user',
    nullable: false
  })
  settings: JSONObject;
}
