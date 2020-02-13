import { JSONObject } from '@cancerlog/api/application';
import { IsObject, IsOptional, IsString, MaxLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { CoreInput } from '@cancerlog/api/core';

@InputType({
  description: 'Update an existing Instrument'
})
export class UpdateInstrumentInput extends CoreInput {
  @IsOptional()
  @IsString()
  @MaxLength(190)
  @Field({
    description: 'The (new) name of this instrument',
    nullable: true
  })
  name: string;

  @IsOptional()
  @IsString()
  @Field({
    description: 'The (new) description of this instrument',
    nullable: true
  })
  description: string;

  @IsOptional()
  @IsObject()
  @Field(type => JSONObject, {
    description: 'The (new) payload / structure of the instrument',
    nullable: true
  })
  instrument: object;
}
