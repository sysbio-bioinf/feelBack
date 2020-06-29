import { InstrumentEntity } from '@feelback-app/api/data';
import { InstrumentObject } from '@feelback-app/api/interfaces';
import { Assembler, ClassTransformerAssembler } from '@nestjs-query/core';

@Assembler(InstrumentObject, InstrumentEntity)
export class InstrumentAssembler extends ClassTransformerAssembler<
  InstrumentObject,
  InstrumentEntity
> {}
