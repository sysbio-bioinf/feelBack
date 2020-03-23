import { InputType, Field } from '@nestjs/graphql';
import { IsString, MaxLength } from 'class-validator';
import { CoreInput } from '@cancerlog/api/core';

@InputType({
  description: 'Create a new person',
})
export class CreatePersonInput extends CoreInput {
  @IsString()
  @MaxLength(190)
  @Field({
    description: 'the pseudonym to be applied',
    nullable: false,
  })
  pseudonym: string;
}
