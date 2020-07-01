import { FaqEntity } from '@feelback-app/api/data';
import { mockRepository } from '@feelback-app/api/testing';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FaqDatabaseService } from './faq-database.service';

describe('FaqDatabaseService', () => {
  let service: FaqDatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FaqDatabaseService,
        {
          provide: getRepositoryToken(FaqEntity),
          useClass: mockRepository,
        },
      ],
    }).compile();

    service = module.get<FaqDatabaseService>(FaqDatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
