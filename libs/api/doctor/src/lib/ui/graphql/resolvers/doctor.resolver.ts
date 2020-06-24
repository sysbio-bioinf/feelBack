import {
  DoctorObject,
  OrganizationObject,
  UpdateDoctorInput,
} from '@cancerlog/api/interfaces';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { Resolver } from '@nestjs/graphql';
import { DoctorAssemblerService } from '../../../services/doctor-assembler.service';
import {
  Roles,
  RolesEnum,
  GqlMasterGuard,
  Unprotected,
} from '@cancerlog/api/auth';

@Resolver(() => DoctorObject)
export class DoctorResolver extends CRUDResolver(DoctorObject, {
  read: {
    decorators: [Unprotected()],
    guards: [GqlMasterGuard],
  },
  create: { disabled: true },
  update: {
    many: { disabled: true },
    UpdateDTOClass: UpdateDoctorInput,
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
      organizations: {
        DTO: OrganizationObject,
        relationName: 'organizations',
        nullable: true,
        disableRemove: true,
        disableUpdate: true,
      },
    },
  },
  enableTotalCount: true,
}) {
  constructor(readonly service: DoctorAssemblerService) {
    super(service);
  }
}
