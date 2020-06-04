import { CoreInput } from '@cancerlog/api/core';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
  IsObject,
  IsLocale,
} from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { CreateUserAgentInput } from './create-user-agent.input';
import { JSONObject } from '@cancerlog/api/application';

@InputType()
export class CreateScreeningInput extends CoreInput {
  @IsUUID('4')
  @IsString()
  @Field({
    description: 'The instance ID (uuid v4) defined by the client',
    nullable: false,
  })
  instanceId: string;

  @IsDate()
  @Field({
    description: 'DateTime when this screening was performed',
    nullable: false,
  })
  collectedAt: Date;

  @IsObject()
  @Field(() => JSONObject, {
    description: 'the collected data',
    nullable: false,
  })
  payload: object;

  @IsString()
  @IsLocale()
  @Field({
    description:
      'The language this screening was performed in. Must be a valid locale.',
    nullable: false,
  })
  language: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateUserAgentInput)
  @Field((type) => CreateUserAgentInput, {
    description: 'UserAgent Information of the device',
    nullable: true,
  })
  userAgent: object;
}
