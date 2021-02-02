import { of } from 'rxjs';
import { TranslatableError } from '../../core/customErrors/translatableError';
import { OrganizationService } from './organization.service';

describe('OrganizationService test', () => {
  let organizationService: OrganizationService;

  const organizationsMockObject = {
    data: {
      organizations: {
        edges: [
          {
            node: {
              id: '0xdummy',
              name: 'Name',
              description: 'Description',
              type: 'Type',
              address: 'Address',
              phone: 'Phone',
              email: 'Email',
              url: 'Url',
              logo: 'Logo',
            },
          },
        ],
      },
    },
  };

  const singleOrganizationMockObject = {
    data: {
      organization: {
        id: '0xdummy',
        name: 'Name',
        description: 'Description',
        type: 'Type',
        address: 'Address',
        phone: 'Phone',
        email: 'Email',
        url: 'Url',
        logo: 'Logo',
      },
    },
  };

  const organizationsResponse = [
    {
      id: '0xdummy',
      name: 'Name',
      description: 'Description',
      type: 'Type',
      address: 'Address',
      phone: 'Phone',
      email: 'Email',
      url: 'Url',
      logo: 'Logo',
    },
  ];

  const singleOrganizationResponse = organizationsResponse[0];

  const getOrganizationsGQLMock = {
    fetch: jest.fn(() => of({})),
  };

  const getOrganizationByIdGQLMock = {
    fetch: jest.fn(({ id: string }) => of({})),
  };

  beforeEach(() => {
    organizationService = new OrganizationService(
      getOrganizationsGQLMock as any,
      getOrganizationByIdGQLMock as any,
    );
  });

  it('should get all organizations', async () => {
    getOrganizationsGQLMock.fetch.mockReturnValueOnce(
      of(organizationsMockObject),
    );
    let organizations = await organizationService.getAll();
    expect(organizations).toEqual(organizationsResponse);
    // error handling
    organizations = [];
    let error;
    getOrganizationsGQLMock.fetch.mockReturnValueOnce(of({ errors: 'yes' }));
    try {
      organizations = await organizationService.getAll();
    } catch (e) {
      error = e;
    }
    expect(error.name).toEqual('TranslatableError');
    expect(error.message).toEqual(
      'app.errors.services.organization.allResponse',
    );
    expect(organizations).toEqual([]);
    getOrganizationsGQLMock.fetch.mockReturnValueOnce(of({ data: {} }));
    organizations = null;
    error = null;
    try {
      organizations = await organizationService.getAll();
    } catch (e) {
      error = e;
    }
    expect(error).toEqual(null);
    expect(organizations).toEqual([]);
    getOrganizationsGQLMock.fetch.mockImplementationOnce(() => {
      throw new Error('gettAllOrganizations mock error');
    });
    expect(organizationService.getAll()).rejects.toThrow(
      'app.errors.services.organization.all',
    );
  });

  it('should get an organization by ID', async () => {
    let organization;
    let error;
    getOrganizationByIdGQLMock.fetch.mockReturnValueOnce(
      of(singleOrganizationMockObject),
    );
    try {
      organization = await organizationService.getById('0xdummy');
    } catch (e) {
      error = e;
    }
    expect(organization).toEqual(singleOrganizationResponse);
    expect(error).toBeUndefined();
    // error handling
    getOrganizationByIdGQLMock.fetch.mockReturnValueOnce(of({ errors: 'yes' }));
    try {
      organization = await organizationService.getById('0xdummy');
    } catch (e) {
      error = e;
    }
    expect(error instanceof TranslatableError).toEqual(true);
    expect(error.message).toEqual(
      'app.errors.services.organization.idResponse',
    );
    getOrganizationByIdGQLMock.fetch.mockReturnValueOnce(of({ data: {} }));
    error = undefined;
    try {
      organization = await organizationService.getById('0xdummy');
    } catch (e) {
      error = e;
    }
    expect(error instanceof TranslatableError).toEqual(true);
    expect(error.message).toEqual('app.errors.services.organization.none');
    getOrganizationByIdGQLMock.fetch.mockImplementationOnce((id: string) => {
      throw new Error('getOrganizationById mock error');
    });
    expect(organizationService.getById('0xdumym')).rejects.toThrow(
      'app.errors.services.organization.id',
    );
  });
});
