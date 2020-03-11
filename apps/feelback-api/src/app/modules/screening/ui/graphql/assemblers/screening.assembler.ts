import { Assembler, ClassTransformerAssembler } from '@nestjs-query/core';
import { ScreeningObject } from '../objects/screening.object';
import { ScreeningEntity } from '../../../data/entities/screening.entity';

@Assembler(ScreeningObject, ScreeningEntity)
export class ScreeningAssembler extends ClassTransformerAssembler<
  ScreeningObject,
  ScreeningEntity
> {}
