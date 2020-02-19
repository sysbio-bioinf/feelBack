import { InputType, Field } from 'type-graphql';
import { CoreInput } from '@cancerlog/api/core';
import { IsOptional, IsString, MaxLength, IsUrl } from 'class-validator';

// TODO: Discuss if this class is really needed

@InputType()
export class CreateDoctorInput extends CoreInput {
  @IsOptional()
  @IsString()
  @MaxLength(190)
  @Field({
    description: '(Academic) title of this doctor',
    nullable: true
  })
  title?: string;

  @IsString()
  @MaxLength(190)
  @Field({
    description: 'Firstname of this doctor',
    nullable: false
  })
  firstname: string;

  @IsString()
  @MaxLength(190)
  @Field({
    description: 'Lastname of this doctor',
    nullable: false
  })
  lastname: string;

  @IsOptional()
  @IsString()
  @MaxLength(190)
  @Field({
    description: 'The phone number of this doctor',
    nullable: true
  })
  phone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(190)
  @Field({
    description: 'An email address of this doctor',
    nullable: true
  })
  email?: string;

  @IsOptional()
  @IsString()
  @IsUrl({ require_protocol: true })
  @MaxLength(190)
  @Field({
    description: 'The URL / website of this doctor',
    nullable: true
  })
  url?: string;

  @IsOptional()
  @IsString()
  @IsUrl({ require_protocol: true })
  @MaxLength(190)
  @Field({
    description: 'The URL for the picture of this doctor',
    nullable: true
  })
  picture?: string;
}
