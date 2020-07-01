import { ScreeningEntity } from '@feelback-app/api/data';
import { mockRepository } from '@feelback-app/api/testing';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ScreeningAssembler } from '../ui/graphql/assemblers/screening.assembler';
import { ScreeningAssemblerService } from './screening-assembler.service';
import { ScreeningDatabaseService } from './screening-database.service';

describe('ScreeningAssemblerService', () => {
  let service: ScreeningAssemblerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScreeningAssemblerService,
        ScreeningAssembler,
        ScreeningDatabaseService,
        {
          provide: getRepositoryToken(ScreeningEntity),
          useClass: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ScreeningAssemblerService>(ScreeningAssemblerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
