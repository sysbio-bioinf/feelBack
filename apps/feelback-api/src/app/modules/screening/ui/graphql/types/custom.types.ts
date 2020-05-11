import {
  ConnectionType,
  QueryArgsType,
  UpdateOneInputType,
} from '@nestjs-query/query-graphql';
import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { IsString, IsUUID } from 'class-validator';
import { ResolveScreeningInput } from '../inputs/resolve-screening.input';
import { ScreeningObject } from '../objects/screening.object';

// FIXME: This results in a wrong type for GQL
@InputType()
export class ResolveOneScreeningInputType extends UpdateOneInputType(
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
  @IsUUID('4')
  @Field()
  instrumentId: string;

  @IsString()
  @IsUUID('4')
  @Field()
  personId: string;
}

export const ScreeningConnection = ConnectionType(ScreeningObject);
