import {
  CreateIdentityInput,
  IdentityObject,
  UpdateIdentityInput,
} from '@cancerlog/api/interfaces';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { IdentityAssemblerService } from '../../../services/identity/identity-assembler.service';
import { IdentityDatabaseService } from '../../../services/identity/identity-database.service';

@Resolver((of) => IdentityObject)
export class IdentityResolver extends CRUDResolver(IdentityObject, {
  create: {
    many: { disabled: true },
    CreateDTOClass: CreateIdentityInput,
  },
  delete: { disabled: true },
  update: { many: { disabled: true }, UpdateDTOClass: UpdateIdentityInput },
}) {
  constructor(
    readonly service: IdentityAssemblerService,
    readonly identityDatabaseService: IdentityDatabaseService,
  ) {
    super(service);
  }

  @Query((returns) => IdentityObject, { nullable: true })
  async identityByPseudonym(
    @Args('pseudonym') pseudonym: string,
  ): Promise<IdentityObject> {
    const identity = await this.identityDatabaseService.repo.findOne({
      where: { pseudonym: pseudonym },
    });

    return this.service.assembler.convertToDTO(identity);
  }
}
