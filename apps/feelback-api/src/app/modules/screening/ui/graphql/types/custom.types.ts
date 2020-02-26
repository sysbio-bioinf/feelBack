import { InputType, Field } from 'type-graphql';
import { CreateOneInputType } from '@nestjs-query/query-graphql';
import { ScreeningObject } from '../objects/screening.object';
import { ResolveScreeningInput } from '../inputs/resolve-screening.input';
import { IsUUID } from 'class-validator';

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
