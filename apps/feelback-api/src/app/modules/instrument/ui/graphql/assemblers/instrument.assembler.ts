import { Assembler, ClassTransformerAssembler } from '@nestjs-query/core';
import { InstrumentObject } from '../objects/instrument.object';
import { InstrumentEntity } from '../../../data/entities/instrument.entity';

@Assembler(InstrumentObject, InstrumentEntity)
export class InstrumentAssembler extends ClassTransformerAssembler<
  InstrumentObject,
  InstrumentEntity
> {}
