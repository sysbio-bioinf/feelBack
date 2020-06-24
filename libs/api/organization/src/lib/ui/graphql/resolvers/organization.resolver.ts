import {
  CreateOrganizationInput,
  DoctorObject,
  OrganizationObject,
  PersonObject,
  UpdateOrganizationInput,
} from '@cancerlog/api/interfaces';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { Resolver } from '@nestjs/graphql';
import { OrganizationAssemblerService } from '../../../services/organization-assembler.service';
import {
  Roles,
  RolesEnum,
  GqlMasterGuard,
  Unprotected,
} from '@cancerlog/api/auth';

@Resolver(() => OrganizationObject)
export class OrganizationResolver extends CRUDResolver(OrganizationObject, {
  read: {
    decorators: [Unprotected()],
    guards: [GqlMasterGuard],
  },
  create: {
    many: { disabled: true },
    CreateDTOClass: CreateOrganizationInput,
    decorators: [Roles(RolesEnum.ADMIN)],
    guards: [GqlMasterGuard],
  },
  update: {
    many: { disabled: true },
    UpdateDTOClass: UpdateOrganizationInput,
    decorators: [Roles(RolesEnum.ADMIN)],
    guards: [GqlMasterGuard],
  },
  delete: {
    many: { disabled: true },
    decorators: [Roles(RolesEnum.ADMIN)],
    guards: [GqlMasterGuard],
  },
  relations: {
    many: {
      members: {
        DTO: DoctorObject,
        relationName: 'members',
        nullable: true,
        disableRemove: true,
        disableUpdate: false,
      },
      // FIXME: this should only be accessible with a certain role
      persons: {
        DTO: PersonObject,
        relationName: 'persons',
        nullable: true,
        disableRemove: true,
        disableUpdate: false,
      },
    },
  },
  enableTotalCount: true,
}) {
  constructor(readonly service: OrganizationAssemblerService) {
    super(service);
  }
}
