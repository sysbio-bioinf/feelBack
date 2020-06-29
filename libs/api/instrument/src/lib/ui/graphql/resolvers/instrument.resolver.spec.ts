import { GuardsModule } from '@feelback-app/api/auth';
import { InstrumentEntity } from '@feelback-app/api/data';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { InstrumentAssemblerService } from '../../../services/instrument-assembler.service';
import { InstrumentDatabaseService } from '../../../services/instrument-database.service';
import { InstrumentAssembler } from '../assemblers/instrument.assembler';
import { InstrumentResolver } from './instrument.resolver';

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
      imports: [GuardsModule],
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
