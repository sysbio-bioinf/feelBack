import {
  InstrumentEntity,
  PersonEntity,
  ScreeningEntity,
} from '@feelback-app/api/data';
import {
  InstrumentAssembler,
  InstrumentAssemblerService,
  InstrumentDatabaseService,
} from '@feelback-app/api/instrument';
import {
  PersonAssembler,
  PersonAssemblerService,
  PersonDatabaseService,
} from '@feelback-app/api/person';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DiagramService } from '../../../services/diagram.service';
import { EvaluationService } from '../../../services/evaluation.service';
import { ScreeningAssemblerService } from '../../../services/screening-assembler.service';
import { ScreeningDatabaseService } from '../../../services/screening-database.service';
import { ScreeningAssembler } from '../assemblers/screening.assembler';
import { ScreeningResolver } from './screening.resolver';
import { GuardsModule } from '@feelback-app/api/auth';

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
      imports: [GuardsModule],
      providers: [
        ScreeningResolver,
        ScreeningAssembler,
        ScreeningAssemblerService,
        ScreeningDatabaseService,
        EvaluationService,
        DiagramService,
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
