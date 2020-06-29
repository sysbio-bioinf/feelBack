import { DoctorEntity } from '@feelback-app/api/data';
import { DoctorObject } from '@feelback-app/api/interfaces';
import { Assembler, ClassTransformerAssembler } from '@nestjs-query/core';

@Assembler(DoctorObject, DoctorEntity)
export class DoctorAssembler extends ClassTransformerAssembler<
  DoctorObject,
  DoctorEntity
> {}
