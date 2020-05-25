import { CoreObject } from '@cancerlog/api/core';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Rule')
export class RuleObject extends CoreObject {
  @Field({
    description: 'the name of the rule',
    nullable: false,
  })
  name!: string;

  @Field({
    description: 'the (boolean) expression of the rule',
    nullable: false,
  })
  condition!: string;

  @Field({
    description: 'the text to be shown if the rule evaluates positive (true)',
    nullable: false,
  })
  then!: string;

  @Field({
    description: 'the text to be shown if the rule evaluates negative (false)',
    nullable: false,
  })
  else!: string;
}
