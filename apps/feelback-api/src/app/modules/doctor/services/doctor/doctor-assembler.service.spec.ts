import { Test, TestingModule } from '@nestjs/testing';
import { DoctorAssemblerService } from './doctor-assembler.service';
import { DoctorAssembler } from '../../ui/graphql/assemblers/doctor.assembler';
import { DoctorDatabaseService } from './doctor-database.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DoctorEntity } from '../../data/entities/doctor.entity';

const mockRepository = jest.fn(() => ({
  metadata: {
    columns: [],
    relations: [],
  },
}));

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
