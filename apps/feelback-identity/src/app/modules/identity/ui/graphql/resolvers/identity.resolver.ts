import { CRUDResolver } from '@nestjs-query/query-graphql';
import { Resolver } from '@nestjs/graphql';
import { IdentityAssemblerService } from '../../../services/identity-assembler/identity-assembler.service';
import { CreateIdentityInput } from '../inputs/create-identity.input';
import { UpdateIdentityInput } from '../inputs/update-identity.input';
import { IdentityObject } from '../objects/identity.object';

@Resolver(of => IdentityObject)
export class IdentityResolver extends CRUDResolver(IdentityObject, {
  create: {
    many: { disabled: true },
    CreateDTOClass: CreateIdentityInput,
  },
  delete: { disabled: true },
  update: { many: { disabled: true }, UpdateDTOClass: UpdateIdentityInput },
}) {
  constructor(readonly service: IdentityAssemblerService) {
    super(service);
  }
}
