import { SelectOneInputType } from '@cancerlog/api/core';
import {
  CreateOneInputType,
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
