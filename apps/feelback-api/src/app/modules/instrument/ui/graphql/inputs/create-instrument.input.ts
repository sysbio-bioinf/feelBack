import { CoreInput } from '@cancerlog/api/core';
import { InputType, Field } from 'type-graphql';
import { IsString, MaxLength, IsOptional, IsObject } from 'class-validator';
import { JSONObject } from '@cancerlog/api/application';

@InputType({
  description: 'Create a new Instrument'
})
export class CreateInstrumentInput extends CoreInput {
  @IsString()
  @MaxLength(190)
  @Field({
    description: 'The name of the instrument',
    nullable: false
  })
  name: string;

  @IsOptional()
  @IsString()
  @Field({
    description: 'The description of the instrument',
    nullable: true
  })
  description: string;

  @IsObject()
  @IsOptional()
  @Field(type => JSONObject, {
    description: 'The payload / structure of the instrument',
    nullable: true
  })
  payload: object;
}
