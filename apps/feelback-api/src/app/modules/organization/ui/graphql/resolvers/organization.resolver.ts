import { Resolver } from '@nestjs/graphql';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { OrganizationObject } from '../objects/organization.object';
import { OrganizationService } from '../../../services/organization.service';
import { CreateOrganizationInput } from '../inputs/create-organization.input';
import { UpdateOrganizationInput } from '../inputs/update-organization.input';
import { DoctorObject } from '../../../../doctor/ui/graphql/objects/doctor.object';

@Resolver(of => OrganizationObject)
export class OrganizationResolver extends CRUDResolver(OrganizationObject, {
  create: { many: { disabled: true }, CreateDTOClass: CreateOrganizationInput },
  delete: { disabled: true },
  update: { many: { disabled: true }, UpdateDTOClass: UpdateOrganizationInput },
  relations: {
    many: {
      members: {
        DTO: DoctorObject,
        relationName: 'members',
        nullable: true,
        disableRemove: true,
        disableUpdate: false,
        disableRead: true // TODO: READ is disabled because of many-to-many issues
      }
    }
  }
}) {
  constructor(readonly service: OrganizationService) {
    super(service);
  }
}
