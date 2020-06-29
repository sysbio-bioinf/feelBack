import { CoreObject } from '@feelback-app/api/core';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Rule')
export class RuleObject extends CoreObject {
  @Field(() => String, {
    description: 'the name of the rule',
    nullable: false,
  })
  name!: string;

  @Field(() => String, {
    description: 'the (boolean) expression of the rule',
    nullable: false,
  })
  condition!: string;

  @Field(() => String, {
    description: 'the text to be shown if the rule evaluates positive (true)',
    nullable: false,
  })
  then!: string;

  @Field(() => String, {
    description: 'the text to be shown if the rule evaluates negative (false)',
    nullable: false,
  })
  else!: string;
}
