import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationDatabaseService } from './organization-database.service';

describe('OrganizationDatabaseService', () => {
  let service: OrganizationDatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizationDatabaseService],
    }).compile();

    service = module.get<OrganizationDatabaseService>(
      OrganizationDatabaseService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
