import { InputType, Field } from 'type-graphql';
import {
  CreateOneInputType,
  RelationInputType,
} from '@nestjs-query/query-graphql';
import { ScreeningObject } from '../objects/screening.object';
import { ResolveScreeningInput } from '../inputs/resolve-screening.input';
import { IsUUID } from 'class-validator';

// FIXME: This results in a wrong type for GQL
@InputType()
export class ResolveOneScreeningInputType extends CreateOneInputType(
  ScreeningObject,
  ResolveScreeningInput,
) {
  @IsUUID('4')
  @Field({
    description: 'id',
  })
  id: string;
}

@InputType()
export class SetInstrumentOnScreeningInput extends RelationInputType() {}
