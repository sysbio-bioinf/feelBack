import { Test, TestingModule } from '@nestjs/testing';
import { ScreeningAssemblerService } from './screening-assembler.service';
import { ScreeningAssembler } from '../../ui/graphql/assemblers/screening.assembler';
import { ScreeningDatabaseService } from './screening-database.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ScreeningEntity } from '@cancerlog/api/data';

const mockRepository = jest.fn(() => ({
  metadata: {
    columns: [],
    relations: [],
  },
}));

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
