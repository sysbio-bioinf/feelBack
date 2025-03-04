import {
  IsOptional,
  IsString,
  MaxLength,
  IsEmail,
  IsUrl,
} from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { CoreInput } from '@feelback-app/api/core';

@InputType()
export class UpdateOrganizationInput extends CoreInput {
  @IsOptional()
  @IsString()
  @MaxLength(190)
  @Field({
    description: 'The (new) name of the organization',
    nullable: true,
  })
  name?: string;

  @IsOptional()
  @IsString()
  @Field({
    description: 'The (new) description of the organization',
    nullable: true,
  })
  description?: string;

  @IsOptional()
  @IsString()
  @MaxLength(190)
  @Field({
    description: 'The (new) type of the organization',
    nullable: true,
  })
  type?: string;

  @IsOptional()
  @IsString()
  @MaxLength(190)
  @Field({
    description: 'The (new) address',
    nullable: true,
  })
  address?: string;

  @IsOptional()
  @IsString()
  @MaxLength(190)
  @Field({
    description: 'The (new) phone number',
    nullable: true,
  })
  phone?: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(190)
  @Field({
    description: 'The (new) email address',
    nullable: true,
  })
  email?: string;

  @IsOptional()
  @IsString()
  @IsUrl({ require_protocol: true })
  @MaxLength(190)
  @Field({
    description: 'The (new) URL',
    nullable: true,
  })
  url?: string;

  @IsOptional()
  @IsString()
  @IsUrl({ require_protocol: true })
  @MaxLength(190)
  @Field({
    description: 'The (new) logo URL',
    nullable: true,
  })
  logo?: string;
}
