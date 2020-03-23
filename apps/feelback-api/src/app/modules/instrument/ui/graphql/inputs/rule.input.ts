import { CoreInput } from '@cancerlog/api/core';
import { InputType, Field } from '@nestjs/graphql';
import { IsString, MaxLength } from 'class-validator';

@InputType()
export class RuleInput extends CoreInput {
  @IsString()
  @MaxLength(190)
  @Field({
    description: 'the name of the rule',
    nullable: false,
  })
  name: string;

  @IsString()
  @Field({
    description: 'the (boolean) expression of the rule',
    nullable: false,
  })
  expression: string;

  @IsString()
  @MaxLength(190)
  @Field({
    description:
      'the headline to be shown if the rule evaluates positive (true)',
    nullable: false,
  })
  headline: string;

  @IsString()
  @Field({
    description: 'the text to be shown if the rule evaluates positive (true)',
    nullable: false,
  })
  text: string;
}
