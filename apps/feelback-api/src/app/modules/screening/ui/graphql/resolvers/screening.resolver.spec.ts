import {
  InstrumentEntity,
  PersonEntity,
  ScreeningEntity,
} from '@cancerlog/api/data';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { InstrumentAssemblerService } from '../../../../instrument/services/instrument/instrument-assembler.service';
import { InstrumentDatabaseService } from '../../../../instrument/services/instrument/instrument-database.service';
import { InstrumentAssembler } from '../../../../instrument/ui/graphql/assemblers/instrument.assembler';
import { PersonDatabaseService } from '../../../../person/services/person/person-database.service';
import { EvaluationService } from '../../../services/evaluation/evaluation.service';
import { ScreeningAssemblerService } from '../../../services/screening/screening-assembler.service';
import { ScreeningDatabaseService } from '../../../services/screening/screening-database.service';
import { ScreeningAssembler } from '../assemblers/screening.assembler';
import { ScreeningResolver } from './screening.resolver';
import { PersonAssemblerService } from '../../../../person/services/person/person-assembler.service';
import { PersonAssembler } from '../../../../person/ui/graphql/assemblers/person.assembler';

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
        PersonAssemblerService,
        PersonDatabaseService,
        PersonAssembler,
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
