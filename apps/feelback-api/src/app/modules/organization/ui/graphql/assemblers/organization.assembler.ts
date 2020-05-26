import { Assembler, ClassTransformerAssembler } from '@nestjs-query/core';
import { OrganizationObject } from '../objects/organization.object';
import { OrganizationEntity } from '@cancerlog/api/data';

@Assembler(OrganizationObject, OrganizationEntity)
export class OrganizationAssembler extends ClassTransformerAssembler<
  OrganizationObject,
  OrganizationEntity
> {}
