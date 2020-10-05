import { VersionableObject } from '@feelback-app/api/core';
import { InstrumentStatesEnum } from '@feelback-app/api/data';
import { JSONObject } from '@feelback-app/api/util';
import { Connection, FilterableField } from '@nestjs-query/query-graphql';
import { Field, ObjectType } from '@nestjs/graphql';
import { ScreeningObject } from './screening.object';

@ObjectType('Instrument', {
  description: 'An Instrument resource for a survey',
})
//FIXME: This should only be called with MANAGER Role
@Connection('screenings', () => ScreeningObject, {
  nullable: true,
  disableRemove: true,
  disableUpdate: true,
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

  @FilterableField(() => InstrumentStatesEnum, {
    description: 'the current state of the instrument',
    nullable: false,
  })
  state!: InstrumentStatesEnum;
}
