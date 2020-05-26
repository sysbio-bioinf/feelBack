import { CoreInput } from '@cancerlog/api/core';
import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateUserAgentInput extends CoreInput {
  @IsOptional()
  @IsString()
  @Field({
    description: 'The device type used for this request',
    nullable: true,
  })
  device: string;

  @IsOptional()
  @IsString()
  @Field({
    description: 'The OS used for this request',
    nullable: true,
  })
  os: string;

  @IsOptional()
  @IsString()
  @Field({
    description: 'The application version used for this request',
    nullable: true,
  })
  application: string;
}
