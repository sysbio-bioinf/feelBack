import { OrganizationEntity } from '@feelback-app/api/data';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OrganizationDatabaseService } from './organization-database.service';

const mockRepository = jest.fn(() => ({
  metadata: {
    columns: [],
    relations: [],
  },
}));

describe('OrganizationDatabaseService', () => {
  let service: OrganizationDatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrganizationDatabaseService,
        {
          provide: getRepositoryToken(OrganizationEntity),
          useClass: mockRepository,
        },
      ],
    }).compile();

    service = module.get<OrganizationDatabaseService>(
      OrganizationDatabaseService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
