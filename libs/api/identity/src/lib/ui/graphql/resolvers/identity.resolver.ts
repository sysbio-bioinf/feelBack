import { Roles, Unprotected } from '@feelback-app/api/auth';
import {
  CreateIdentityInput,
  IdentityObject,
  RolesEnum,
  UpdateIdentityInput,
} from '@feelback-app/api/interfaces';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { IdentityAssemblerService } from '../../../services/identity-assembler.service';
import { IdentityDatabaseService } from '../../../services/identity-database.service';

@Resolver(() => IdentityObject)
export class IdentityResolver extends CRUDResolver(IdentityObject, {
  read: {
    many: { disabled: true },
    decorators: [Unprotected()],
  },
  create: {
    many: { disabled: true },
    CreateDTOClass: CreateIdentityInput,
    decorators: [Roles(RolesEnum.ADMIN)],
  },
  update: {
    many: { disabled: true },
    UpdateDTOClass: UpdateIdentityInput,
    decorators: [Roles(RolesEnum.ADMIN)],
  },
  delete: {
    many: { disabled: true },
    decorators: [Roles(RolesEnum.ADMIN)],
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
