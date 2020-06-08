import { InputType, Field } from '@nestjs/graphql';
import { CoreInput } from '@cancerlog/api/core';
import { IsString, IsBoolean } from 'class-validator';

@InputType()
export class CreateFaqInput extends CoreInput {
  @IsString()
  @Field({
    description: 'the question for this entry',
    nullable: false,
  })
  question!: string;

  @IsString()
  @Field({
    description: 'the answer for this entry',
    nullable: false,
  })
  answer!: string;

  @IsBoolean()
  @Field({
    description: 'if this entry shall be activated',
    nullable: false,
  })
  isActive!: boolean;
}
