import { IdentityEntity } from '@cancerlog/api/data';
import { IdentityObject } from '@cancerlog/api/interfaces';
import { AssemblerQueryService, QueryService } from '@nestjs-query/core';
import { IdentityAssembler } from '../ui/graphql/assemblers/identity.assembler';
import { IdentityDatabaseService } from './identity-database.service';

@QueryService(IdentityObject)
export class IdentityAssemblerService extends AssemblerQueryService<
  IdentityObject,
  IdentityEntity
> {
  constructor(assembler: IdentityAssembler, service: IdentityDatabaseService) {
    super(assembler, service);
  }
}
