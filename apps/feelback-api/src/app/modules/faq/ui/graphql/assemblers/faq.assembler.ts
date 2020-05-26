import { FaqEntity } from '@cancerlog/api/data';
import { FaqObject } from '@cancerlog/api/interfaces';
import { Assembler, ClassTransformerAssembler } from '@nestjs-query/core';

@Assembler(FaqObject, FaqEntity)
export class FaqAssembler extends ClassTransformerAssembler<
  FaqObject,
  FaqEntity
> {}
