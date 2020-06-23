import { InstrumentEntity } from '@cancerlog/api/data';
import { InstrumentObject } from '@cancerlog/api/interfaces';
import { Assembler, ClassTransformerAssembler } from '@nestjs-query/core';

@Assembler(InstrumentObject, InstrumentEntity)
export class InstrumentAssembler extends ClassTransformerAssembler<
  InstrumentObject,
  InstrumentEntity
> {}
