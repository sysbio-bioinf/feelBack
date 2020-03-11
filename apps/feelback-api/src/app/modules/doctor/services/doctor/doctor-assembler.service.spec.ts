import { Test, TestingModule } from '@nestjs/testing';
import { DoctorAssemblerService } from './doctor-assembler.service';

describe('DoctorAssemblerService', () => {
  let service: DoctorAssemblerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoctorAssemblerService],
    }).compile();

    service = module.get<DoctorAssemblerService>(DoctorAssemblerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
