import { InputType, Field } from 'type-graphql';
import { CoreInput } from '@cancerlog/api/core';
import { IsUUID } from 'class-validator';

@InputType()
export class EvaluateScreeningInput extends CoreInput {
  @IsUUID('4')
  @Field({
    description: 'the id of the screening to be evaluated',
    nullable: false,
  })
  id: string;
}
