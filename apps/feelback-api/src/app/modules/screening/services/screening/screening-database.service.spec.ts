import { Test, TestingModule } from '@nestjs/testing';
import { ScreeningDatabaseService } from './screening-database.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ScreeningEntity } from '../../data/entities/screening.entity';

const mockRepository = jest.fn(() => ({
  metadata: {
    columns: [],
    relations: [],
  },
}));

describe('ScreeningDatabaseService', () => {
  let service: ScreeningDatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScreeningDatabaseService,
        {
          provide: getRepositoryToken(ScreeningEntity),
          useClass: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ScreeningDatabaseService>(ScreeningDatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
