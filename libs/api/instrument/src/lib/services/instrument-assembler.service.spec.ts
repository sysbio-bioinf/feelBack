import { InstrumentEntity } from '@feelback-app/api/data';
import { mockRepository } from '@feelback-app/api/testing';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { InstrumentAssembler } from '../ui/graphql/assemblers/instrument.assembler';
import { InstrumentAssemblerService } from './instrument-assembler.service';
import { InstrumentDatabaseService } from './instrument-database.service';

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
