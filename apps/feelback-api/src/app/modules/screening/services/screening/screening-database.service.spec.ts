import { Test, TestingModule } from '@nestjs/testing';
import { ScreeningDatabaseService } from './screening-database.service';

describe('ScreeningDatabaseService', () => {
  let service: ScreeningDatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScreeningDatabaseService],
    }).compile();

    service = module.get<ScreeningDatabaseService>(ScreeningDatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
