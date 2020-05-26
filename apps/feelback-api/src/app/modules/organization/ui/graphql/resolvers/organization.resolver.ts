import {
  CreateOrganizationInput,
  DoctorObject,
  OrganizationObject,
  UpdateOrganizationInput,
} from '@cancerlog/api/interfaces';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { Resolver } from '@nestjs/graphql';
import { OrganizationAssemblerService } from '../../../services/organization/organization-assembler.service';

@Resolver((of) => OrganizationObject)
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
