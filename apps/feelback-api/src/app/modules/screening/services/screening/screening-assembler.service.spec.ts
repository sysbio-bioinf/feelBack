import { Test, TestingModule } from '@nestjs/testing';
import { ScreeningAssemblerService } from './screening-assembler.service';

describe('ScreeningAssemblerService', () => {
  let service: ScreeningAssemblerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScreeningAssemblerService],
    }).compile();

    service = module.get<ScreeningAssemblerService>(ScreeningAssemblerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
