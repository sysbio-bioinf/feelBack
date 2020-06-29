import { InputType, Field } from '@nestjs/graphql';
import { CoreInput } from '@feelback-app/api/core';
import {
  IsOptional,
  IsString,
  MaxLength,
  IsUrl,
  IsObject,
} from 'class-validator';
import { JSONObject } from '@feelback-app/api/util';

@InputType()
export class UpdateDoctorInput extends CoreInput {
  @IsOptional()
  @IsString()
  @MaxLength(190)
  @Field({
    description: '(Academic) title of this doctor',
    nullable: true,
  })
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(190)
  @Field({
    description: 'Firstname of this doctor',
    nullable: true,
  })
  firstname?: string;

  @IsOptional()
  @IsString()
  @MaxLength(190)
  @Field({
    description: 'Lastname of this doctor',
    nullable: true,
  })
  lastname?: string;

  @IsOptional()
  @IsString()
  @MaxLength(190)
  @Field({
    description: 'The phone number of this doctor',
    nullable: true,
  })
  phone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(190)
  @Field({
    description: 'An email address of this doctor',
    nullable: true,
  })
  email?: string;

  @IsOptional()
  @IsString()
  @IsUrl({ require_protocol: true })
  @MaxLength(190)
  @Field({
    description: 'The URL / website of this doctor',
    nullable: true,
  })
  url?: string;

  @IsOptional()
  @IsString()
  @IsUrl({ require_protocol: true })
  @MaxLength(190)
  @Field({
    description: 'The URL for the picture of this doctor',
    nullable: true,
  })
  picture?: string;
}
