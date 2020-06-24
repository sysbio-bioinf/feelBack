import {
  CreateIdentityInput,
  IdentityObject,
  UpdateIdentityInput,
} from '@cancerlog/api/interfaces';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { IdentityAssemblerService } from '../../../services/identity-assembler.service';
import { IdentityDatabaseService } from '../../../services/identity-database.service';
import {
  Unprotected,
  GqlMasterGuard,
  Roles,
  RolesEnum,
} from '@cancerlog/api/auth';
import { UseGuards } from '@nestjs/common';

@Resolver(() => IdentityObject)
export class IdentityResolver extends CRUDResolver(IdentityObject, {
  read: {
    many: { disabled: true },
    decorators: [Unprotected()],
    guards: [GqlMasterGuard],
  },
  create: {
    many: { disabled: true },
    CreateDTOClass: CreateIdentityInput,
    decorators: [Roles(RolesEnum.ADMIN)],
    guards: [GqlMasterGuard],
  },
  update: {
    many: { disabled: true },
    UpdateDTOClass: UpdateIdentityInput,
    decorators: [Roles(RolesEnum.ADMIN)],
    guards: [GqlMasterGuard],
  },
  delete: {
    many: { disabled: true },
    decorators: [Roles(RolesEnum.ADMIN)],
    guards: [GqlMasterGuard],
  },
}) {
  constructor(
    readonly service: IdentityAssemblerService,
    readonly identityDatabaseService: IdentityDatabaseService,
  ) {
    super(service);
  }

  @Query((returns) => IdentityObject, { nullable: true })
  @Unprotected()
  @UseGuards(GqlMasterGuard)
  async identityByPseudonym(
    @Args('pseudonym') pseudonym: string,
  ): Promise<IdentityObject> {
    const identityEntity = await this.identityDatabaseService.repo.findOneOrFail(
      {
        where: { pseudonym: pseudonym },
      },
    );

    return this.service.assembler.convertToDTO(identityEntity);
  }
}
