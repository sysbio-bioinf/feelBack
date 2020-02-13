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
  @Field({
    description: 'The name of the organization'
  })
  name: string;

  @IsOptional()
  @IsString()
  @Field({
    description: 'The description of the organization',
    nullable: true
  })
  description?: string;

  @IsString()
  @MaxLength(190)
  @Field({
    description: 'The type of the organization'
  })
  type: string;

  @IsOptional()
  @IsString()
  @MaxLength(190)
  @Field({
    description: 'The address of the organization',
    nullable: true
  })
  address?: string;

  @IsOptional()
  @IsString()
  @MaxLength(190)
  @Field({
    description: 'The Phone number',
    nullable: true
  })
  phone?: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(190)
  @Field({
    description: 'The main email address',
    nullable: true
  })
  email?: string;

  @IsOptional()
  @IsUrl()
  @MaxLength(190)
  @Field({
    description: 'The URL / Website of this organization',
    nullable: true
  })
  url?: string;

  @IsOptional()
  @IsUrl()
  @MaxLength(190)
  @Field({
    description: 'The logo as valid URL string)',
    nullable: true
  })
  logo?: string;
}
