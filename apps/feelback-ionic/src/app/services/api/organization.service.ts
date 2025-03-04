import { Injectable } from '@angular/core';
import {
  GetOrganizationsGQL,
  GetOrganizationByIdGQL,
} from '../../graphql/generated/feelback.graphql';
import { Organization } from '../../models/organization.model';
import { TranslatableError } from '../../core/customErrors/translatableError';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  constructor(
    private gqlOrganizations: GetOrganizationsGQL,
    private gqlOrganizationById: GetOrganizationByIdGQL,
  ) {}

  async getAll(): Promise<Organization[]> {
    let organizationsResponse;
    try {
      organizationsResponse = await this.gqlOrganizations.fetch().toPromise();
    } catch (err) {
      console.error(err);
      throw new TranslatableError('app.errors.services.organization.all');
    }

    if (organizationsResponse.errors) {
      throw new TranslatableError(
        'app.errors.services.organization.allResponse',
      );
    }

    let organizations;
    try {
      organizations = organizationsResponse.data.organizations.edges.map(
        (item) => {
          return {
            id: item.node.id,
            name: item.node.name,
            description: item.node.description,
            type: item.node.type,
            address: item.node.address,
            phone: item.node.phone,
            email: item.node.email,
            url: item.node.url,
            logo: item.node.logo,
          } as Organization;
        },
      );
    } catch (error) {
      console.error('Error mapping the organization');
      organizations = [];
    }

    return organizations;
  }

  async getById(id: string): Promise<Organization> {
    let organizationResponse;
    try {
      organizationResponse = await this.gqlOrganizationById
        .fetch({ id })
        .toPromise();
    } catch (err) {
      console.error(err);
      throw new TranslatableError('app.errors.services.organization.id');
    }

    if (organizationResponse.errors) {
      throw new TranslatableError(
        'app.errors.services.organization.idResponse',
      );
    }

    let organization: Organization;
    try {
      const organizationData = organizationResponse.data.organization;
      organization = {
        id: organizationData.id,
        name: organizationData.name,
        description: organizationData.description,
        type: organizationData.type,
        address: organizationData.address,
        phone: organizationData.phone,
        email: organizationData.email,
        url: organizationData.url,
        logo: organizationData.logo,
      };
    } catch (error) {
      console.error('Error building the organization');
      organization = null;
    }

    if (!organization) {
      throw new TranslatableError('app.errors.services.organization.none');
    }

    return organization;
  }
}
