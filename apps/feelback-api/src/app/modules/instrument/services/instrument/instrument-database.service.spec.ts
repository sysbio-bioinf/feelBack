import { Test, TestingModule } from '@nestjs/testing';
import { InstrumentDatabaseService } from './instrument-database.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { InstrumentEntity } from '../../data/entities/instrument.entity';

const mockRepository = jest.fn(() => ({
  metadata: {
    columns: [],
    relations: [],
  },
}));

describe('InstrumentDatabaseService', () => {
  let service: InstrumentDatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InstrumentDatabaseService,
        {
          provide: getRepositoryToken(InstrumentEntity),
          useClass: mockRepository,
        },
      ],
    }).compile();

    service = module.get<InstrumentDatabaseService>(InstrumentDatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
