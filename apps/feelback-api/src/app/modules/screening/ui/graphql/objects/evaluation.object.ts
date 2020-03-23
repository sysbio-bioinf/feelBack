import { CoreObject } from '@cancerlog/api/core';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType('Evaluation')
export class EvaluationObject extends CoreObject {
  @Field({
    description: 'the name of the rule',
    nullable: false,
  })
  name: string;

  @Field({
    description: 'the expression that was used to evaluate the data',
    nullable: false,
  })
  expression: string;

  @Field({
    description: 'the headline to be displayed if this rule is true',
    nullable: false,
  })
  headline: string;

  @Field({
    description: 'the text to be displayed if this rule is true',
    nullable: false,
  })
  text: string;

  @Field({
    description: 'The boolean result of the evaluation, NULL = failure',
    nullable: true,
  })
  result?: boolean;
}
