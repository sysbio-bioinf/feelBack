import { Test, TestingModule } from '@nestjs/testing';
import { FaqAssemblerService } from './faq-assembler.service';
import { FaqAssembler } from '../../ui/graphql/assemblers/faq.assembler';
import { FaqDatabaseService } from './faq-database.service';
import { FaqEntity } from '../../data/entities/faq.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

const mockRepository = jest.fn(() => ({
  metadata: {
    columns: [],
    relations: [],
  },
}));

describe('FaqAssemblerService', () => {
  let service: FaqAssemblerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FaqAssemblerService,
        FaqAssembler,
        FaqDatabaseService,
        {
          provide: getRepositoryToken(FaqEntity),
          useClass: mockRepository,
        },
      ],
    }).compile();

    service = module.get<FaqAssemblerService>(FaqAssemblerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
