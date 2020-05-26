import { Test, TestingModule } from '@nestjs/testing';
import { DoctorResolver } from './doctor.resolver';
import { DoctorAssemblerService } from '../../../services/doctor/doctor-assembler.service';
import { DoctorDatabaseService } from '../../../services/doctor/doctor-database.service';
import { DoctorAssembler } from '../assemblers/doctor.assembler';
import { DoctorEntity } from '@cancerlog/api/data';
import { getRepositoryToken } from '@nestjs/typeorm';

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
