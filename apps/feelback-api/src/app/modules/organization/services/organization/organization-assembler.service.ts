import { AssemblerQueryService, QueryService } from '@nestjs-query/core';
import { OrganizationEntity } from '../../data/entities/organization.entity';
import { OrganizationAssembler } from '../../ui/graphql/assemblers/organization.assembler';
import { OrganizationObject } from '../../ui/graphql/objects/organization.object';
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
