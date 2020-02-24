import { Field, InputType } from 'type-graphql';
import {
  IsDateString,
  IsString,
  IsOptional,
  ValidateNested,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateUserAgentInput } from './create-user-agent.input';
import { CoreInput } from '@cancerlog/api/core';

@InputType()
export class CreateScreeningInput extends CoreInput {
  @IsUUID('4')
  @IsString()
  @Field({
    description: 'The instance ID (uuid v4) defined by the client',
    nullable: false,
  })
  instanceId: string;

  @IsDateString()
  @Field({
    description: 'DateTime when this screening was performed',
    nullable: false,
  })
  collectedAt: Date;

  @IsString()
  // TODO: add a @IsLocale() Validator once it is available
  @Field({
    description: 'The language this screening was performed in',
    nullable: false,
  })
  language: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateUserAgentInput)
  @Field(type => CreateUserAgentInput, {
    description: 'UserAgent Information of the device',
    nullable: true,
  })
  userAgent: object;
}
