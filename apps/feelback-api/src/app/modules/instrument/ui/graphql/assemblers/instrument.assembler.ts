import { Assembler, ClassTransformerAssembler } from '@nestjs-query/core';
import { InstrumentObject } from '../objects/instrument.object';
import { InstrumentEntity } from '@cancerlog/api/data';

@Assembler(InstrumentObject, InstrumentEntity)
export class InstrumentAssembler extends ClassTransformerAssembler<
  InstrumentObject,
  InstrumentEntity
> {}
