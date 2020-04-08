import { Injectable } from '@angular/core';
import { Organization } from '@cancerlog/core/models/mobile/organization.model';
import {
  GetOrganizationsGQL,
  GetOrganizationByIdGQL,
} from 'src/app/graphql/generated/feelback.graphql';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  constructor(
    private gqlOrganizations: GetOrganizationsGQL,
    private gqlOrganizationById: GetOrganizationByIdGQL,
  ) {}

  async getAll(): Promise<Organization[]> {
    const organizationsResponse = await this.gqlOrganizations
      .fetch()
      .toPromise();
    if (organizationsResponse.errors) {
      throw new Error('Es ist ein Fehler aufgetreten');
    }

    const organizations = organizationsResponse.data.organizations.edges.map(
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

    return organizations;
  }

  async getOrganizationById(id: string): Promise<Organization> {
    const organizationResponse = await this.gqlOrganizationById
      .fetch({ id })
      .toPromise();
    if (organizationResponse.errors) {
      throw new Error('Es ist ein Fehler aufgetreten');
    }

    const organizationData = organizationResponse.data.organization;
    if (!organizationData) {
      throw new Error('Es ist ein Fehler aufgetreten');
    }

    return {
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
  }
}
