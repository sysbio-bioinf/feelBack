import { Test, TestingModule } from '@nestjs/testing';
import { FaqAssemblerService } from './faq-assembler.service';

describe('FaqAssemblerService', () => {
  let service: FaqAssemblerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FaqAssemblerService],
    }).compile();

    service = module.get<FaqAssemblerService>(FaqAssemblerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
