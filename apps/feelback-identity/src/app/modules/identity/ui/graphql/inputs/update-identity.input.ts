import { CoreInput } from '@cancerlog/api/core';
import { InputType, Field } from 'type-graphql';
import { IsOptional, IsString, MaxLength } from 'class-validator';

@InputType({
  description: 'Update an Identity'
})
export class UpdateIdentityInput extends CoreInput {
  @IsOptional()
  @IsString()
  @MaxLength(190)
  @Field({ nullable: true })
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(190)
  @Field({ nullable: true })
  firstname?: string;

  @IsOptional()
  @IsString()
  @MaxLength(190)
  @Field({ nullable: true })
  lastname?: string;
}
