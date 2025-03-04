import { GuardsModule } from '@feelback-app/api/auth';
import { FaqEntity } from '@feelback-app/api/data';
import { mockRepository } from '@feelback-app/api/testing';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FaqAssemblerService } from '../../../services/faq-assembler.service';
import { FaqDatabaseService } from '../../../services/faq-database.service';
import { FaqAssembler } from '../assemblers/faq.assembler';
import { FaqResolver } from './faq.resolver';

describe('FaqResolver', () => {
  let resolver: FaqResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [GuardsModule],
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
