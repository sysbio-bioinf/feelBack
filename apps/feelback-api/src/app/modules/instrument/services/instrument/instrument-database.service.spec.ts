import { Test, TestingModule } from '@nestjs/testing';
import { InstrumentDatabaseService } from './instrument-database.service';

describe('InstrumentDatabaseService', () => {
  let service: InstrumentDatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InstrumentDatabaseService],
    }).compile();

    service = module.get<InstrumentDatabaseService>(InstrumentDatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
