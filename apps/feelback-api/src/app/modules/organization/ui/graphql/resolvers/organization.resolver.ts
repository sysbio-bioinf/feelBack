import {
  CreateOrganizationInput,
  DoctorObject,
  OrganizationObject,
  UpdateOrganizationInput,
  PersonObject,
} from '@cancerlog/api/interfaces';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { Resolver } from '@nestjs/graphql';
import { OrganizationAssemblerService } from '../../../services/organization/organization-assembler.service';

@Resolver(() => OrganizationObject)
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
