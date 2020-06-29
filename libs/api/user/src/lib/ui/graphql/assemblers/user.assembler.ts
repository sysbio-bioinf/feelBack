import { UserObject } from '@feelback-app/api/interfaces';
import { DoctorEntity } from '@feelback-app/api/data';
import { ClassTransformerAssembler, Assembler } from '@nestjs-query/core';

@Assembler(UserObject, DoctorEntity)
export class UserAssembler extends ClassTransformerAssembler<
  UserObject,
  DoctorEntity
> {}
