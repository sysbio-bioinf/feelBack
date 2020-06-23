import { JSONObject } from '@cancerlog/api/util';
import { Field, InputType } from '@nestjs/graphql';
import { IsObject, IsOptional } from 'class-validator';
import { UpdateDoctorInput } from './update-doctor.input';

@InputType()
export class UpdateUserInput extends UpdateDoctorInput {
  @IsOptional()
  @IsObject()
  @Field((type) => JSONObject, {
    description: 'custom settings as json object',
    nullable: true,
  })
  settings?: object;
}
