import { Test, TestingModule } from '@nestjs/testing';
import { InstrumentAssemblerService } from './instrument-assembler.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { InstrumentEntity } from '../../data/entities/instrument.entity';
import { InstrumentDatabaseService } from './instrument-database.service';
import { InstrumentAssembler } from '../../ui/graphql/assemblers/instrument.assembler';

const mockRepository = jest.fn(() => ({
  metadata: {
    columns: [],
    relations: [],
  },
}));

describe('InstrumentAssemblerService', () => {
  let service: InstrumentAssemblerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InstrumentAssemblerService,
        InstrumentDatabaseService,
        InstrumentAssembler,
        {
          provide: getRepositoryToken(InstrumentEntity),
          useClass: mockRepository,
        },
      ],
    }).compile();

    service = module.get<InstrumentAssemblerService>(
      InstrumentAssemblerService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
