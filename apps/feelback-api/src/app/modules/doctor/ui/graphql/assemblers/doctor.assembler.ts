import { DoctorObject } from '../objects/doctor.object';
import { DoctorEntity } from '../../../data/entities/doctor.entity';
import { ClassTransformerAssembler, Assembler } from '@nestjs-query/core';

@Assembler(DoctorObject, DoctorEntity)
export class DoctorAssembler extends ClassTransformerAssembler<
  DoctorObject,
  DoctorEntity
> {}
