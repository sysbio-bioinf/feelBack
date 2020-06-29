import { IdentityEntity } from '@feelback-app/api/data';
import { IdentityObject } from '@feelback-app/api/interfaces';
import { Assembler, ClassTransformerAssembler } from '@nestjs-query/core';

@Assembler(IdentityObject, IdentityEntity)
export class IdentityAssembler extends ClassTransformerAssembler<
  IdentityObject,
  IdentityEntity
> {}
