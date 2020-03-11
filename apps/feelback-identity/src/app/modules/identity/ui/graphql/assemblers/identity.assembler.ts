import { Assembler, ClassTransformerAssembler } from '@nestjs-query/core';
import { IdentityObject } from '../objects/identity.object';
import { IdentityEntity } from '../../../data/entities/identity.entity';

@Assembler(IdentityObject, IdentityEntity)
export class IdentityAssembler extends ClassTransformerAssembler<
  IdentityObject,
  IdentityEntity
> {}
