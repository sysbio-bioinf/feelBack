import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationResolver } from './organization.resolver';
import { OrganizationAssembler } from '../assemblers/organization.assembler';
import { OrganizationDatabaseService } from '../../../services/organization/organization-database.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OrganizationEntity } from '../../../data/entities/organization.entity';
import { OrganizationAssemblerService } from '../../../services/organization/organization-assembler.service';

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
