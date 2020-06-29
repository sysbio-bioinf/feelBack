import { VersionableObject } from '@feelback-app/api/core';
import { FilterableField } from '@nestjs-query/query-graphql';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Doctor', {
  description: 'A Doctor, Psychologist or Caregiver',
})
export class DoctorObject extends VersionableObject {
  @Field(() => String, {
    description: '(Academic) title of this doctor',
    nullable: true,
  })
  title!: string | null;

  @FilterableField(() => String, {
    description: 'Firstname of this doctor',
    nullable: true,
  })
  firstname!: string | null;

  @FilterableField(() => String, {
    description: 'Lastname of this doctor',
    nullable: true,
  })
  lastname!: string | null;

  @Field(() => String, {
    description: 'The phone number of this doctor',
    nullable: true,
  })
  phone!: string | null;

  @Field(() => String, {
    description: 'An email address of this doctor',
    nullable: true,
  })
  email!: string | null;

  @Field(() => String, {
    description: 'The URL / website of this doctor',
    nullable: true,
  })
  url!: string | null;

  @Field(() => String, {
    description: 'The URL for the picture of this doctor',
    nullable: true,
  })
  picture!: string | null;
}
