import { JSONObject } from '@cancerlog/api/application';
import { VersionableObject } from '@cancerlog/api/core';
import { FilterableField } from '@nestjs-query/query-graphql';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Instrument', {
  description: 'An Instrument resource for a survey',
})
export class InstrumentObject extends VersionableObject {
  @FilterableField(() => String, {
    description: 'The name of this instrument',
    nullable: false,
  })
  name!: string;

  @Field(() => String, {
    description: 'A description for this instrument',
    nullable: true,
  })
  description!: string;

  @FilterableField(() => String, {
    description: 'The type of this instrument',
    nullable: false,
  })
  type!: string;

  @Field(() => String, {
    description: 'An image / icon URL for this instrument',
    nullable: true,
  })
  image!: string | null;

  @Field((type) => JSONObject, {
    description: 'The actual payload / content / structure of this instrument',
    nullable: false,
  })
  payload!: object;

  @Field((type) => [JSONObject], {
    description: 'rules that are applied to calculate some kind of result',
    nullable: false,
  })
  rules!: object[];

  @Field((type) => JSONObject, {
    description: 'Information on how to create diagrams for this instrument',
    nullable: false,
  })
  diagram!: object;

  @Field(() => String, {
    description:
      'the changelog of this instrument (i.e., what has been changed)',
    nullable: false,
  })
  changelog!: string;

  xState!: string | null;
}
