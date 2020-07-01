import { InstrumentEntity } from '@feelback-app/api/data';
import { mockRepository } from '@feelback-app/api/testing';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { InstrumentDatabaseService } from './instrument-database.service';

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
