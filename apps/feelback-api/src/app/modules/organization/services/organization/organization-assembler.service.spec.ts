import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationAssemblerService } from './organization-assembler.service';

describe('OrganizationAssemblerService', () => {
  let service: OrganizationAssemblerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizationAssemblerService],
    }).compile();

    service = module.get<OrganizationAssemblerService>(
      OrganizationAssemblerService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
