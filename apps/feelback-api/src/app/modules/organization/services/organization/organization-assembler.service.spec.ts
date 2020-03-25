import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationAssemblerService } from './organization-assembler.service';
import { OrganizationEntity } from '../../data/entities/organization.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OrganizationAssembler } from '../../ui/graphql/assemblers/organization.assembler';
import { OrganizationDatabaseService } from './organization-database.service';

const mockRepository = jest.fn(() => ({
  metadata: {
    columns: [],
    relations: [],
  },
}));

describe('OrganizationAssemblerService', () => {
  let service: OrganizationAssemblerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrganizationAssemblerService,
        OrganizationAssembler,
        OrganizationDatabaseService,
        {
          provide: getRepositoryToken(OrganizationEntity),
          useClass: mockRepository,
        },
      ],
    }).compile();

    service = module.get<OrganizationAssemblerService>(
      OrganizationAssemblerService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
