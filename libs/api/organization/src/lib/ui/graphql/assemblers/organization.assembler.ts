import { OrganizationEntity } from '@cancerlog/api/data';
import { OrganizationObject } from '@cancerlog/api/interfaces';
import { Assembler, ClassTransformerAssembler } from '@nestjs-query/core';

@Assembler(OrganizationObject, OrganizationEntity)
export class OrganizationAssembler extends ClassTransformerAssembler<
  OrganizationObject,
  OrganizationEntity
> {}
