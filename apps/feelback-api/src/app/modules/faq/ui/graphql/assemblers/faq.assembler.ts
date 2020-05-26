import { Assembler, ClassTransformerAssembler } from '@nestjs-query/core';
import { FaqEntity } from '@cancerlog/api/data';
import { FaqObject } from '../objects/faq.object';

@Assembler(FaqObject, FaqEntity)
export class FaqAssembler extends ClassTransformerAssembler<
  FaqObject,
  FaqEntity
> {}
