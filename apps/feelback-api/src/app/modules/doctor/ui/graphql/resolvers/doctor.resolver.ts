import { CRUDResolver } from '@nestjs-query/query-graphql';
import { Resolver } from '@nestjs/graphql';
import { OrganizationObject } from '../../../../organization/ui/graphql/objects/organization.object';
import { DoctorAssemblerService } from '../../../services/doctor/doctor-assembler.service';
import { UpdateDoctorInput } from '@cancerlog/api/interfaces';
import { DoctorObject } from '@cancerlog/api/interfaces';

@Resolver((of) => DoctorObject)
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
