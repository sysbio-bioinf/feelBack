import { UpdateOneInputType } from '@nestjs-query/query-graphql';
import { IsUUID } from 'class-validator';
import { Field, InputType } from 'type-graphql';
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
