import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FaqEntity } from '../../data/entities/faq.entity';
import { FaqDatabaseService } from './faq-database.service';

const mockRepository = jest.fn(() => ({
  metadata: {
    columns: [],
    relations: [],
  },
}));

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
