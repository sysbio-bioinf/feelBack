import { InputType, Field } from 'type-graphql';
import { CoreInput } from '@cancerlog/api/core';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class ResolveScreeningInput extends CoreInput {
  @IsOptional()
  @IsString()
  @Field({
    description: 'comments for resolving this issue',
    nullable: true,
  })
  resolveComment?: string;
}
