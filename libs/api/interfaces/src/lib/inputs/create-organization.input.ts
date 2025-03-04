import { InputType, Field } from '@nestjs/graphql';
import { CoreInput } from '@feelback-app/api/core';
import {
  IsString,
  MaxLength,
  IsOptional,
  IsEmail,
  IsUrl,
} from 'class-validator';

@InputType()
export class CreateOrganizationInput extends CoreInput {
  @IsString()
  @MaxLength(190)
  @Field({
    description: 'The name of the organization',
    nullable: false,
  })
  name!: string;

  @IsString()
  @Field({
    description: 'The description of the organization',
    nullable: false,
  })
  description!: string;

  @IsString()
  @MaxLength(190)
  @Field({
    description: 'The type of the organization',
    nullable: false,
  })
  type!: string;

  @IsOptional()
  @IsString()
  @MaxLength(190)
  @Field({
    description: 'The address of the organization',
    nullable: true,
  })
  address?: string;

  @IsOptional()
  @IsString()
  @MaxLength(190)
  @Field({
    description: 'The Phone number',
    nullable: true,
  })
  phone?: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(190)
  @Field({
    description: 'The main email address',
    nullable: true,
  })
  email?: string;

  @IsOptional()
  @IsString()
  @IsUrl({ require_protocol: true })
  @MaxLength(190)
  @Field({
    description: 'The URL / Website of this organization',
    nullable: true,
  })
  url?: string;

  @IsOptional()
  @IsString()
  @IsUrl({ require_protocol: true })
  @MaxLength(190)
  @Field({
    description: 'The logo as valid URL string)',
    nullable: true,
  })
  logo?: string;
}
