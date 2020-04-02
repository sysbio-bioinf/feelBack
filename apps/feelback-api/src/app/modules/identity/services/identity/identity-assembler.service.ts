import { AssemblerQueryService, QueryService } from '@nestjs-query/core';
import { IdentityAssembler } from '../../ui/graphql/assemblers/identity.assembler';
import { IdentityEntity } from '../../data/entities/identity.entity';
import { IdentityObject } from '../../ui/graphql/objects/identity.object';
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
