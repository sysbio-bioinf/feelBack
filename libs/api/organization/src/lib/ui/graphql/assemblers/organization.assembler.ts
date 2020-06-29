import { OrganizationEntity } from '@feelback-app/api/data';
import { OrganizationObject } from '@feelback-app/api/interfaces';
import { Assembler, ClassTransformerAssembler } from '@nestjs-query/core';

@Assembler(OrganizationObject, OrganizationEntity)
export class OrganizationAssembler extends ClassTransformerAssembler<
  OrganizationObject,
  OrganizationEntity
> {}
