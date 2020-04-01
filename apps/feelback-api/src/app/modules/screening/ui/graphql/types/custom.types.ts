import {
  UpdateOneInputType,
  QueryArgsType,
  ConnectionType,
} from '@nestjs-query/query-graphql';
import { IsUUID, IsString } from 'class-validator';
import { Field, InputType, ArgsType } from '@nestjs/graphql';
import { ResolveScreeningInput } from '../inputs/resolve-screening.input';
import { ScreeningObject } from '../objects/screening.object';

// FIXME: This results in a wrong type for GQL
@InputType()
export class ResolveOneScreeningInputType extends UpdateOneInputType(
  ScreeningObject,
  ResolveScreeningInput,
) {
  @IsUUID('4')
  @Field({
    description: 'id',
  })
  id: string;
}

@ArgsType()
export class GetScreeningsByPersonAndInstrumentArgsType extends QueryArgsType(
  ScreeningObject,
) {
  @IsString()
  @Field()
  pseudonym: string;

  @IsString()
  @IsUUID('4')
  @Field()
  instrument: string;
}

export const ScreeningConnection = ConnectionType(ScreeningObject);
