import { Roles, Unprotected } from '@feelback-app/api/auth';
import {
  CreateOrganizationInput,
  DoctorObject,
  OrganizationObject,
  PersonObject,
  UpdateOrganizationInput,
} from '@feelback-app/api/interfaces';
import { RolesEnum } from '@feelback-app/api/shared';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { Resolver } from '@nestjs/graphql';
import { OrganizationAssemblerService } from '../../../services/organization-assembler.service';

@Resolver(() => OrganizationObject)
export class OrganizationResolver extends CRUDResolver(OrganizationObject, {
  read: {
    decorators: [Unprotected()],
  },
  create: {
    many: { disabled: true },
    CreateDTOClass: CreateOrganizationInput,
    decorators: [Roles(RolesEnum.ADMIN)],
  },
  update: {
    many: { disabled: true },
    UpdateDTOClass: UpdateOrganizationInput,
    decorators: [Roles(RolesEnum.ADMIN)],
  },
  delete: {
    many: { disabled: true },
    decorators: [Roles(RolesEnum.ADMIN)],
  },
  enableTotalCount: true,
}) {
  constructor(readonly service: OrganizationAssemblerService) {
    super(service);
  }
}
