import { Test, TestingModule } from '@nestjs/testing';
import { IdentityAssemblerService } from './identity-assembler.service';

describe('IdentityAssemblerService', () => {
  let service: IdentityAssemblerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IdentityAssemblerService],
    }).compile();

    service = module.get<IdentityAssemblerService>(IdentityAssemblerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
