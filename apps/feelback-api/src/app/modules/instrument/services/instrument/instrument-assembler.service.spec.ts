import { Test, TestingModule } from '@nestjs/testing';
import { InstrumentAssemblerService } from './instrument-assembler.service';

describe('InstrumentAssemblerService', () => {
  let service: InstrumentAssemblerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InstrumentAssemblerService],
    }).compile();

    service = module.get<InstrumentAssemblerService>(
      InstrumentAssemblerService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
