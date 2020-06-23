import {
  InstrumentEntity,
  PersonEntity,
  ScreeningEntity,
} from '@cancerlog/api/data';
import { IDENTITY_DB_CONNECTION_NAME } from '@cancerlog/api/database';
import { IdentityModule } from '@cancerlog/api/identity';
import {
  InstrumentAssembler,
  InstrumentAssemblerService,
  InstrumentDatabaseService,
} from '@cancerlog/api/instrument';
import {
  PersonAssembler,
  PersonAssemblerService,
  PersonDatabaseService,
  PersonModule,
} from '@cancerlog/api/person';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DiagramService } from '../../../services/diagram/diagram.service';
import { EvaluationService } from '../../../services/evaluation/evaluation.service';
import { ScreeningAssemblerService } from '../../../services/screening/screening-assembler.service';
import { ScreeningDatabaseService } from '../../../services/screening/screening-database.service';
import { ScreeningAssembler } from '../assemblers/screening.assembler';
import { ScreeningResolver } from './screening.resolver';

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
