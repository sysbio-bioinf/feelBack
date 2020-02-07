import { InputType, Field } from 'type-graphql';
import { CoreInput } from '@cancerlog/api/core';
import {
  IsString,
  MaxLength,
  IsOptional,
  IsEmail,
  IsUrl
} from 'class-validator';

@InputType()
export class CreateOrganizationInput extends CoreInput {
  @IsString()
  @MaxLength(190)
  @Field()
  name: string;

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
