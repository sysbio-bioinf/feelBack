import { DoctorObject } from '@cancerlog/api/interfaces';
import { DoctorEntity } from '@cancerlog/api/data';
import { ClassTransformerAssembler, Assembler } from '@nestjs-query/core';

@Assembler(DoctorObject, DoctorEntity)
export class DoctorAssembler extends ClassTransformerAssembler<
  DoctorObject,
  DoctorEntity
> {}
