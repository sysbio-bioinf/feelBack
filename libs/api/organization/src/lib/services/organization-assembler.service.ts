import { OrganizationEntity } from '@feelback-app/api/data';
import { OrganizationObject } from '@feelback-app/api/interfaces';
import { AssemblerQueryService, QueryService } from '@nestjs-query/core';
import { OrganizationAssembler } from '../ui/graphql/assemblers/organization.assembler';
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
