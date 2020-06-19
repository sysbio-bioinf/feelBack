import { CoreInput } from '@cancerlog/api/core';
import { InputType, Field } from '@nestjs/graphql';
import {
  IsString,
  MaxLength,
  IsOptional,
  IsObject,
  IsArray,
  ValidateNested,
  IsUrl,
} from 'class-validator';
import { JSONObject } from '@cancerlog/api/util';
import { RuleInput } from './rule.input';
import { Type } from 'class-transformer';

@InputType({
  description: 'Create a new Instrument',
})
export class CreateInstrumentInput extends CoreInput {
  @IsString()
  @MaxLength(190)
  @Field({
    description: 'The name of the instrument',
    nullable: false,
  })
  name!: string;

  @IsString()
  @Field({
    description: 'The description of the instrument',
    nullable: false,
  })
  description!: string;

  @IsString()
  @MaxLength(190)
  @Field({
    description: 'The type of the instrument',
  })
  type!: string;

  @IsOptional()
  @IsString()
  @IsUrl({ require_protocol: true })
  @MaxLength(190)
  @Field({
    description: 'The logo as valid URL string)',
    nullable: true,
  })
  image?: string;

  @IsOptional()
  @IsObject()
  @Field((type) => JSONObject, {
    description: 'The payload / structure of the instrument',
    nullable: true,
  })
  payload?: object;

  @IsOptional()
  @IsArray()
  @IsObject({ each: true })
  @Type(() => RuleInput)
  @ValidateNested({ each: true })
  @Field((type) => [RuleInput], { nullable: true })
  rules?: RuleInput[];

  // TODO: better input validation
  @IsOptional()
  @IsObject()
  @Field((type) => JSONObject, {
    description: 'Information on how to create diagrams for this instrument',
    nullable: true,
  })
  diagram?: object;

  @IsString()
  @Field({
    description: 'what has changed so far',
    nullable: false,
  })
  changelog!: string;
}
