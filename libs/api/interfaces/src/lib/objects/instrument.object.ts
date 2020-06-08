import { JSONObject } from '@cancerlog/api/application';
import { VersionableObject } from '@cancerlog/api/core';
import { FilterableField } from '@nestjs-query/query-graphql';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Instrument', {
  description: 'An Instrument resource for a survey',
})
export class InstrumentObject extends VersionableObject {
  @FilterableField({
    description: 'The name of this instrument',
    nullable: false,
  })
  name!: string;

  @Field({
    description: 'A description for this instrument',
    nullable: true,
  })
  description?: string;

  @FilterableField({
    description: 'The type of this instrument',
    nullable: false,
  })
  type!: string;

  @Field({
    description: 'An image / icon URL for this instrument',
    nullable: true,
  })
  image?: string;

  @Field((type) => JSONObject, {
    description: 'The actual payload / content / structure of this instrument',
    nullable: true,
  })
  payload?: object;

  @Field((type) => [JSONObject], {
    description: 'rules that are applied to calculate some kind of result',
    nullable: true,
  })
  rules?: object[];

  @Field((type) => JSONObject, {
    description: 'Information on how to create diagrams for this instrument',
    nullable: true,
  })
  diagram?: object;

  @Field({
    description:
      'the changelog of this instrument (i.e., what has been changed)',
    nullable: false,
  })
  changelog!: string;

  xState!: string;
}
