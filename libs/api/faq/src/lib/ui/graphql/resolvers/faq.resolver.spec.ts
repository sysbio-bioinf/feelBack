import { FaqEntity } from '@cancerlog/api/data';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FaqAssemblerService } from '../../../services/faq-assembler.service';
import { FaqDatabaseService } from '../../../services/faq-database.service';
import { FaqAssembler } from '../assemblers/faq.assembler';
import { FaqResolver } from './faq.resolver';

const mockRepository = jest.fn(() => ({
  metadata: {
    columns: [],
    relations: [],
  },
}));

describe('FaqResolver', () => {
  let resolver: FaqResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FaqResolver,
        FaqAssemblerService,
        FaqDatabaseService,
        FaqAssembler,
        {
          provide: getRepositoryToken(FaqEntity),
          useClass: mockRepository,
        },
      ],
    }).compile();

    resolver = module.get<FaqResolver>(FaqResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
