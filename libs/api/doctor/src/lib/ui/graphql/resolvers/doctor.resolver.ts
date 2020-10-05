import { Roles, Unprotected } from '@feelback-app/api/auth';
import { DoctorObject, UpdateDoctorInput } from '@feelback-app/api/interfaces';
import { RolesEnum } from '@feelback-app/api/shared';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { Resolver } from '@nestjs/graphql';
import { DoctorAssemblerService } from '../../../services/doctor-assembler.service';

@Resolver(() => DoctorObject)
export class DoctorResolver extends CRUDResolver(DoctorObject, {
  read: {
    decorators: [Unprotected()],
  },
  create: { disabled: true },
  update: {
    many: { disabled: true },
    UpdateDTOClass: UpdateDoctorInput,
    decorators: [Roles(RolesEnum.ADMIN)],
  },
  delete: {
    many: { disabled: true },
    decorators: [Roles(RolesEnum.ADMIN)],
  },
  enableTotalCount: true,
}) {
  constructor(readonly service: DoctorAssemblerService) {
    super(service);
  }
}
