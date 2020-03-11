import { Test, TestingModule } from '@nestjs/testing';
import { IdentityDatabaseService } from './identity-database.service';

describe('IdentityDatabaseService', () => {
  let service: IdentityDatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IdentityDatabaseService],
    }).compile();

    service = module.get<IdentityDatabaseService>(IdentityDatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
