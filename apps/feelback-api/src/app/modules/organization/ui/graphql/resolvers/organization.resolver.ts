import { Resolver } from '@nestjs/graphql';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { OrganizationObject } from '../objects/organization.object';
import { OrganizationService } from '../../../services/organization.service';
import { CreateOrganizationInput } from '../inputs/create-organization.input';
import { UpdateOrganizationInput } from '../inputs/update-organization.input';

@Resolver()
export class OrganizationResolver extends CRUDResolver(OrganizationObject, {
  create: { many: { disabled: true }, CreateDTOClass: CreateOrganizationInput },
  delete: { many: { disabled: true } },
  update: { many: { disabled: true }, UpdateDTOClass: UpdateOrganizationInput }
}) {
  constructor(readonly service: OrganizationService) {
    super(service);
  }
}
