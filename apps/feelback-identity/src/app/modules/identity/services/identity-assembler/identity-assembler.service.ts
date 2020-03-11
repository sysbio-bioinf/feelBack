import { AssemblerQueryService, QueryService } from '@nestjs-query/core';
import { IdentityAssembler } from '../../data/assemblers/identity.assembler';
import { IdentityEntity } from '../../data/entities/identity.entity';
import { IdentityObject } from '../../ui/graphql/objects/identity.object';
import { IdentityService } from '../identity/identity.service';

@QueryService(IdentityObject)
export class IdentityAssemblerService extends AssemblerQueryService<
  IdentityObject,
  IdentityEntity
> {
  constructor(assembler: IdentityAssembler, service: IdentityService) {
    super(assembler, service);
  }
}
