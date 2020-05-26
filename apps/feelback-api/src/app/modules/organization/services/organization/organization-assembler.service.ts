import { AssemblerQueryService, QueryService } from '@nestjs-query/core';
import { OrganizationEntity } from '@cancerlog/api/data';
import { OrganizationAssembler } from '../../ui/graphql/assemblers/organization.assembler';
import { OrganizationObject } from '@cancerlog/api/interfaces';
import { OrganizationDatabaseService } from './organization-database.service';

@QueryService(OrganizationObject)
export class OrganizationAssemblerService extends AssemblerQueryService<
  OrganizationObject,
  OrganizationEntity
> {
  constructor(
    assembler: OrganizationAssembler,
    service: OrganizationDatabaseService,
  ) {
    super(assembler, service);
  }
}
