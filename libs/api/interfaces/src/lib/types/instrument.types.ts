import { SelectOneInputType } from '@feelback-app/api/core';
import {
  CreateOneInputType,
  DeleteOneInputType,
  UpdateOneInputType,
} from '@nestjs-query/query-graphql';
import { InputType } from '@nestjs/graphql';
import { CreateInstrumentInput } from '../inputs/create-instrument.input';
import { UpdateInstrumentInput } from '../inputs/update-instrument.input';

@InputType()
export class CreateOneInstrumentInputType extends CreateOneInputType(
  'instrument',
  CreateInstrumentInput,
) {}

@InputType()
export class UpdateOneInstrumentInputType extends UpdateOneInputType(
  UpdateInstrumentInput,
) {}

@InputType()
export class ReleaseOneInstrumentInputType extends SelectOneInputType {}

@InputType()
export class RetireOneInstrumentInputType extends SelectOneInputType {}

@InputType()
export class CopyOneInstrumentInputType extends SelectOneInputType {}

@InputType()
export class DeleteOneInstrumentInputType extends DeleteOneInputType() {}
