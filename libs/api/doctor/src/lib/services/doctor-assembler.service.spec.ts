import { DoctorEntity } from '@feelback-app/api/data';
import { mockRepository } from '@feelback-app/api/testing';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DoctorAssembler } from '../ui/graphql/assemblers/doctor.assembler';
import { DoctorAssemblerService } from './doctor-assembler.service';
import { DoctorDatabaseService } from './doctor-database.service';

describe('DoctorAssemblerService', () => {
  let service: DoctorAssemblerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DoctorAssemblerService,
        DoctorAssembler,
        DoctorDatabaseService,
        {
          provide: getRepositoryToken(DoctorEntity),
          useClass: mockRepository,
        },
      ],
    }).compile();

    service = module.get<DoctorAssemblerService>(DoctorAssemblerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
