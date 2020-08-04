import {
  ConnectionType,
  CreateOneInputType,
  QueryArgsType,
  UpdateOneInputType,
} from '@nestjs-query/query-graphql';
import { ArgsType, Field, ID, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { CreateScreeningInput } from '../inputs/create-screening.input';
import { ResolveScreeningInput } from '../inputs/resolve-screening.input';
import { ScreeningObject } from '../objects/screening.object';

// FIXME: This results in a wrong type for GQL
@InputType()
export class ResolveOneScreeningInputType extends UpdateOneInputType(
  ResolveScreeningInput,
) {
  @IsString()
  @IsUUID('4')
  @Field(() => ID, {
    description: 'id',
  })
  id!: string;
}

@InputType()
export class UploadScreeningInputType extends CreateOneInputType(
  'screening',
  CreateScreeningInput,
) {
  @IsString()
  @IsUUID('4')
  @Field(() => ID)
  instrumentId!: string;

  @IsOptional()
  @IsString()
  @IsUUID('4')
  @Field(() => ID, { nullable: true })
  personId!: string | null;
}

@ArgsType()
export class GetScreeningsByPersonAndInstrumentArgsType extends QueryArgsType(
  ScreeningObject,
) {
  @IsString()
  @IsUUID('4')
  @Field(() => ID)
  instrumentId!: string;

  @IsString()
  @IsUUID('4')
  @Field(() => ID)
  personId!: string;
}

export const ScreeningConnection = ConnectionType(ScreeningObject);
