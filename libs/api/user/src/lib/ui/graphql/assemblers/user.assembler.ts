import { UserObject } from '@cancerlog/api/interfaces';
import { DoctorEntity } from '@cancerlog/api/data';
import { ClassTransformerAssembler, Assembler } from '@nestjs-query/core';

@Assembler(UserObject, DoctorEntity)
export class UserAssembler extends ClassTransformerAssembler<
  UserObject,
  DoctorEntity
> {}
