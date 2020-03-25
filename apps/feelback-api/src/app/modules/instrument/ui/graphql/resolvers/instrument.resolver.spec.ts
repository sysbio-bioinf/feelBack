import { Test, TestingModule } from '@nestjs/testing';
import { InstrumentResolver } from './instrument.resolver';
import { InstrumentAssemblerService } from '../../../services/instrument/instrument-assembler.service';
import { InstrumentAssembler } from '../assemblers/instrument.assembler';
import { InstrumentDatabaseService } from '../../../services/instrument/instrument-database.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { InstrumentEntity } from '../../../data/entities/instrument.entity';

const mockRepository = jest.fn(() => ({
  metadata: {
    columns: [],
    relations: [],
  },
}));

describe('InstrumentResolver', () => {
  let resolver: InstrumentResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InstrumentResolver,
        InstrumentAssemblerService,
        InstrumentAssembler,
        InstrumentDatabaseService,
        {
          provide: getRepositoryToken(InstrumentEntity),
          useClass: mockRepository,
        },
      ],
    }).compile();

    resolver = module.get<InstrumentResolver>(InstrumentResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
