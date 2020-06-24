import { DoctorEntity } from '@cancerlog/api/data';
import { DoctorObject } from '@cancerlog/api/interfaces';
import { Assembler, ClassTransformerAssembler } from '@nestjs-query/core';

@Assembler(DoctorObject, DoctorEntity)
export class DoctorAssembler extends ClassTransformerAssembler<
  DoctorObject,
  DoctorEntity
> {}
