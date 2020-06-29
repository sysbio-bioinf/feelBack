import { FaqEntity } from '@feelback-app/api/data';
import { FaqObject } from '@feelback-app/api/interfaces';
import { Assembler, ClassTransformerAssembler } from '@nestjs-query/core';

@Assembler(FaqObject, FaqEntity)
export class FaqAssembler extends ClassTransformerAssembler<
  FaqObject,
  FaqEntity
> {}
