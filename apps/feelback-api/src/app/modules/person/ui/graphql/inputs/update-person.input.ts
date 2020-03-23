import { CoreInput } from '@cancerlog/api/core';
import { InputType, Field } from '@nestjs/graphql';
import { IsBoolean } from 'class-validator';

@InputType({
  description: 'Update a person',
})
export class UpdatePersonInput extends CoreInput {
  @IsBoolean()
  @Field({
    description: 'if the person has accepted the TOS',
    nullable: false,
  })
  acceptedTOS: boolean;
}
