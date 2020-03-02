import { JSONObject } from '@cancerlog/api/application';
import {
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { CoreInput } from '@cancerlog/api/core';
import { RuleInput } from './rule.input';
import { Type } from 'class-transformer';

@InputType({
  description: 'Update an existing Instrument',
})
export class UpdateInstrumentInput extends CoreInput {
  @IsOptional()
  @IsString()
  @MaxLength(190)
  @Field({
    description: 'The (new) name of this instrument',
    nullable: true,
  })
  name: string;

  @IsOptional()
  @IsString()
  @Field({
    description: 'The (new) description of this instrument',
    nullable: true,
  })
  description: string;

  @IsOptional()
  @IsObject()
  @Field(type => JSONObject, {
    description: 'The (new) payload / structure of the instrument',
    nullable: true,
  })
  payload: object;

  @IsOptional()
  @IsArray()
  @IsObject({ each: true })
  @Type(() => RuleInput)
  @ValidateNested({ each: true })
  @Field(type => [RuleInput], { nullable: true })
  rules: RuleInput[];

  @IsString()
  @Field({
    description: 'what has changed so far',
    nullable: false,
  })
  changelog: string;
}
