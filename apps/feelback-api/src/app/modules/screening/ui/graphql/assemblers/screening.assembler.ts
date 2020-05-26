import { ScreeningEntity } from '@cancerlog/api/data';
import { ScreeningObject } from '@cancerlog/api/interfaces';
import { Assembler, ClassTransformerAssembler } from '@nestjs-query/core';

@Assembler(ScreeningObject, ScreeningEntity)
export class ScreeningAssembler extends ClassTransformerAssembler<
  ScreeningObject,
  ScreeningEntity
> {}
