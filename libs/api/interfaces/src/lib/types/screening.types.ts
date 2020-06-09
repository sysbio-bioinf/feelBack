import {
  ConnectionType,
  QueryArgsType,
  UpdateOneInputType,
  CreateOneInputType,
} from '@nestjs-query/query-graphql';
import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { IsString, IsUUID, IsOptional } from 'class-validator';
import { ResolveScreeningInput } from '../inputs/resolve-screening.input';
import { ScreeningObject } from '../objects/screening.object';
import { CreateScreeningInput } from '../inputs/create-screening.input';

// FIXME: This results in a wrong type for GQL
@InputType()
export class ResolveOneScreeningInputType extends UpdateOneInputType(
  ResolveScreeningInput,
) {
  @IsUUID('4')
  @Field({
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
  @Field()
  instrumentId!: string;

  @IsOptional()
  @IsString()
  @IsUUID('4')
  @Field(() => String, { nullable: true })
  personId!: string | null;
}

@ArgsType()
export class GetScreeningsByPersonAndInstrumentArgsType extends QueryArgsType(
  ScreeningObject,
) {
  @IsString()
  @IsUUID('4')
  @Field()
  instrumentId!: string;

  @IsString()
  @IsUUID('4')
  @Field()
  personId!: string;
}

export const ScreeningConnection = ConnectionType(ScreeningObject);
