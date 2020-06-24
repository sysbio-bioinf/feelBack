import { OrganizationEntity } from '@cancerlog/api/data';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OrganizationAssemblerService } from '../../../services/organization-assembler.service';
import { OrganizationDatabaseService } from '../../../services/organization-database.service';
import { OrganizationAssembler } from '../assemblers/organization.assembler';
import { OrganizationResolver } from './organization.resolver';
import { GuardsModule } from '@cancerlog/api/auth';

const mockRepository = jest.fn(() => ({
  metadata: {
    columns: [],
    relations: [],
  },
}));

describe('OrganizationResolver', () => {
  let resolver: OrganizationResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [GuardsModule],
      providers: [
        OrganizationResolver,
        OrganizationAssemblerService,
        OrganizationAssembler,
        OrganizationDatabaseService,
        {
          provide: getRepositoryToken(OrganizationEntity),
          useClass: mockRepository,
        },
      ],
    }).compile();

    resolver = module.get<OrganizationResolver>(OrganizationResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
