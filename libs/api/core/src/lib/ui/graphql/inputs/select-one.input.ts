import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType({ isAbstract: true })
export class SelectOneInputType {
  @IsNotEmpty()
  @Field(() => ID, {
    nullable: false,
    description: 'The ID of the record',
  })
  id!: string | number;
}
