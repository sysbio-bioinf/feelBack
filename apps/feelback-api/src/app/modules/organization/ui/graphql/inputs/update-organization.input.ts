import {
  IsOptional,
  IsString,
  MaxLength,
  IsEmail,
  IsUrl
} from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { CoreInput } from '@cancerlog/api/core';

@InputType()
export class UpdateOrganizationInput extends CoreInput {
  @IsOptional()
  @IsString()
  @MaxLength(190)
  @Field({ nullable: true })
  name?: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  description?: string;

  @IsOptional()
  @IsString()
  @MaxLength(190)
  @Field({ nullable: true })
  address?: string;

  @IsOptional()
  @IsString()
  @MaxLength(190)
  @Field({ nullable: true })
  phone?: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(190)
  @Field({ nullable: true })
  email?: string;

  @IsOptional()
  @IsUrl()
  @MaxLength(190)
  @Field({ nullable: true })
  url?: string;

  @IsOptional()
  @IsUrl()
  @MaxLength(190)
  @Field({ nullable: true })
  logo?: string;
}
