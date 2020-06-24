import { GuardsModule } from '@cancerlog/api/auth';
import { DoctorEntity } from '@cancerlog/api/data';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DoctorAssemblerService } from '../../../services/doctor-assembler.service';
import { DoctorDatabaseService } from '../../../services/doctor-database.service';
import { DoctorAssembler } from '../assemblers/doctor.assembler';
import { DoctorResolver } from './doctor.resolver';

const mockRepository = jest.fn(() => ({
  metadata: {
    columns: [],
    relations: [],
  },
}));

describe('DoctorResolver', () => {
  let resolver: DoctorResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [GuardsModule],
      providers: [
        DoctorResolver,
        DoctorAssemblerService,
        DoctorDatabaseService,
        DoctorAssembler,
        {
          provide: getRepositoryToken(DoctorEntity),
          useClass: mockRepository,
        },
      ],
    }).compile();

    resolver = module.get<DoctorResolver>(DoctorResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
