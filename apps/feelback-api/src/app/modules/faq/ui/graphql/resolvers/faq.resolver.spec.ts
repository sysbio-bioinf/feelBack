import { Test, TestingModule } from '@nestjs/testing';
import { FaqResolver } from './faq.resolver';
import { FaqAssemblerService } from '../../../services/faq/faq-assembler.service';
import { FaqDatabaseService } from '../../../services/faq/faq-database.service';
import { FaqAssembler } from '../assemblers/faq.assembler';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FaqEntity } from '../../../data/entities/faq.entity';

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
