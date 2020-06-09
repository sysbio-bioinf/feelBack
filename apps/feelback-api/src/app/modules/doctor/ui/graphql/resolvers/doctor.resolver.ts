import {
  DoctorObject,
  OrganizationObject,
  UpdateDoctorInput,
} from '@cancerlog/api/interfaces';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { Resolver } from '@nestjs/graphql';
import { DoctorAssemblerService } from '../../../services/doctor/doctor-assembler.service';

@Resolver(() => DoctorObject)
export class DoctorResolver extends CRUDResolver(DoctorObject, {
  create: { disabled: true },
  delete: { disabled: true },
  update: { many: { disabled: true }, UpdateDTOClass: UpdateDoctorInput },
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
}) {
  constructor(readonly service: DoctorAssemblerService) {
    super(service);
  }
}
