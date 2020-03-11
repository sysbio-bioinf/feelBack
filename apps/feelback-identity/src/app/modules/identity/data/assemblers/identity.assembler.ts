import { Assembler, ClassTransformerAssembler } from '@nestjs-query/core';
import { IdentityObject } from '../../ui/graphql/objects/identity.object';
import { IdentityEntity } from '../entities/identity.entity';

@Assembler(IdentityObject, IdentityEntity)
export class IdentityAssembler extends ClassTransformerAssembler<
  IdentityObject,
  IdentityEntity
> {}
