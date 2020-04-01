import { Test, TestingModule } from '@nestjs/testing';
import { ScreeningResolver } from './screening.resolver';
import { ScreeningAssembler } from '../assemblers/screening.assembler';
import { ScreeningAssemblerService } from '../../../services/screening/screening-assembler.service';
import { ScreeningDatabaseService } from '../../../services/screening/screening-database.service';
import { ScreeningEntity } from '../../../data/entities/screening.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EvaluationService } from '../../../services/evaluation/evaluation.service';
import { InstrumentAssemblerService } from '../../../../instrument/services/instrument/instrument-assembler.service';
import { InstrumentAssembler } from '../../../../instrument/ui/graphql/assemblers/instrument.assembler';
import { InstrumentDatabaseService } from '../../../../instrument/services/instrument/instrument-database.service';
import { InstrumentEntity } from '../../../../instrument/data/entities/instrument.entity';
import { PersonDatabaseService } from '../../../../person/services/person/person-database.service';
import { PersonEntity } from '../../../../person/data/entities/person.entity';

const mockRepository = jest.fn(() => ({
  metadata: {
    columns: [],
    relations: [],
  },
}));

describe('ScreeningResolver', () => {
  let resolver: ScreeningResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScreeningResolver,
        ScreeningAssembler,
        ScreeningAssemblerService,
        ScreeningDatabaseService,
        EvaluationService,
        InstrumentAssemblerService,
        InstrumentDatabaseService,
        InstrumentAssembler,
        PersonDatabaseService,
        {
          provide: getRepositoryToken(ScreeningEntity),
          useClass: mockRepository,
        },
        {
          provide: getRepositoryToken(InstrumentEntity),
          useClass: mockRepository,
        },
        {
          provide: getRepositoryToken(PersonEntity),
          useClass: mockRepository,
        },
      ],
    }).compile();

    resolver = module.get<ScreeningResolver>(ScreeningResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
