import { Resolver } from '@nestjs/graphql';
import { DoctorObject } from '../objects/doctor.object';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { DoctorService } from '../../../services/doctor.service';
import { UpdateDoctorInput } from '../inputs/update-doctor.input';
import { OrganizationObject } from '../../../../organization/ui/graphql/objects/organization.object';

@Resolver(of => DoctorObject)
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
        disableRead: true // TODO: READ is disabled because of many-to-many issues
      }
    }
  }
}) {
  constructor(readonly service: DoctorService) {
    super(service);
  }
}
