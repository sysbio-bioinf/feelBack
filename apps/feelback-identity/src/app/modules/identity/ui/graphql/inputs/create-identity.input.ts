import { InputType, Field } from 'type-graphql';
import { CoreInput } from '@cancerlog/api/core';
import { IsString, MaxLength } from 'class-validator';

@InputType({
  description: 'Create a new (empty) identity'
})
export class CreateIdentityInput extends CoreInput {
  @IsString()
  @MaxLength(190)
  @Field({
    description: 'The pseudonym of the identity',
    nullable: false
  })
  pseudonym: string;
}
