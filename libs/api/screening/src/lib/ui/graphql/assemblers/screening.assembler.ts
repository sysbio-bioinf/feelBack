import { ScreeningEntity } from '@feelback-app/api/data';
import { ScreeningObject } from '@feelback-app/api/interfaces';
import { Assembler, ClassTransformerAssembler } from '@nestjs-query/core';

@Assembler(ScreeningObject, ScreeningEntity)
export class ScreeningAssembler extends ClassTransformerAssembler<
  ScreeningObject,
  ScreeningEntity
> {}
