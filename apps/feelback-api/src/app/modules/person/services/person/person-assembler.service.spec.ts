import { Test, TestingModule } from '@nestjs/testing';
import { PersonAssemblerService } from './person-assembler.service';

describe('PersonAssemblerService', () => {
  let service: PersonAssemblerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonAssemblerService],
    }).compile();

    service = module.get<PersonAssemblerService>(PersonAssemblerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
