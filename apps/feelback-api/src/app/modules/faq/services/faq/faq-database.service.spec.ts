import { Test, TestingModule } from '@nestjs/testing';
import { FaqDatabaseService } from './faq-database.service';

describe('FaqDatabaseService', () => {
  let service: FaqDatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FaqDatabaseService],
    }).compile();

    service = module.get<FaqDatabaseService>(FaqDatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
