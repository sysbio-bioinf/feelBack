import { CRUDResolver } from '@nestjs-query/query-graphql';
import { Resolver } from '@nestjs/graphql';
import { DoctorObject } from '../../../../doctor/ui/graphql/objects/doctor.object';
import { OrganizationAssemblerService } from '../../../services/organization/organization-assembler.service';
import { CreateOrganizationInput } from '../inputs/create-organization.input';
import { UpdateOrganizationInput } from '../inputs/update-organization.input';
import { OrganizationObject } from '../objects/organization.object';

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
      },
    },
  },
}) {
  constructor(readonly service: OrganizationAssemblerService) {
    super(service);
  }
}
