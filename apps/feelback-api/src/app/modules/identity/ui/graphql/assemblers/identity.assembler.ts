import { IdentityEntity } from '@cancerlog/api/data';
import { IdentityObject } from '@cancerlog/api/interfaces';
import { Assembler, ClassTransformerAssembler } from '@nestjs-query/core';

@Assembler(IdentityObject, IdentityEntity)
export class IdentityAssembler extends ClassTransformerAssembler<
  IdentityObject,
  IdentityEntity
> {}
