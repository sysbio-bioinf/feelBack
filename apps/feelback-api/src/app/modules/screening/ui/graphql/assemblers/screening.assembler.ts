import { Assembler, ClassTransformerAssembler } from '@nestjs-query/core';
import { ScreeningObject } from '../objects/screening.object';
import { ScreeningEntity } from '@cancerlog/api/data';

@Assembler(ScreeningObject, ScreeningEntity)
export class ScreeningAssembler extends ClassTransformerAssembler<
  ScreeningObject,
  ScreeningEntity
> {}
