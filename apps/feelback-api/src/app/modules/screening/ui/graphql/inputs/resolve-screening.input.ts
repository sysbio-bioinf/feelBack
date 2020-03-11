import { InputType, Field } from 'type-graphql';
import { CoreInput } from '@cancerlog/api/core';
import { IsOptional, IsString, IsDate } from 'class-validator';

@InputType()
export class ResolveScreeningInput extends CoreInput {
  @IsString()
  @Field({
    description: 'comments for resolving this issue',
    nullable: false,
  })
  resolveComment: string;

  @IsDate()
  @Field({
    description: 'Date this issue was resolved',
    nullable: false,
  })
  resolvedAt: Date;
}
