import { of } from 'rxjs';
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
    getOrganizationsGQLMock.fetch.mockReturnValueOnce(of({ errors: 'yes' }));
    expect(organizationService.getAll()).rejects.toThrow(
      'Es ist ein Fehler aufgetreten',
    );
    getOrganizationsGQLMock.fetch.mockReturnValueOnce(
      of(organizationsMockObject),
    );
    const faqs = await organizationService.getAll();
    expect(faqs).toEqual(organizationsResponse);
  });

  it('should get an organization by ID', async () => {
    getOrganizationByIdGQLMock.fetch.mockReturnValueOnce(of({ errors: 'yes' }));
    expect(organizationService.getById('0xdummy')).rejects.toThrow(
      'Es ist ein Fehler aufgetreten',
    );
    getOrganizationByIdGQLMock.fetch.mockReturnValueOnce(of({ data: {} }));
    expect(organizationService.getById('0xdummy')).rejects.toThrow(
      'Es ist ein Fehler aufgetreten',
    );
    getOrganizationByIdGQLMock.fetch.mockReturnValueOnce(
      of(singleOrganizationMockObject),
    );
    const faq = await organizationService.getById('0xdummy');
    expect(faq).toEqual(singleOrganizationResponse);
  });
});
