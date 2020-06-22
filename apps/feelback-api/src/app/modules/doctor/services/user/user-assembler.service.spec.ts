import { DoctorEntity } from '@cancerlog/api/data';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserAssembler } from '../../ui/graphql/assemblers/user.assembler';
import { DoctorDatabaseService } from './../doctor/doctor-database.service';
import { UserAssemblerService } from './user-assembler.service';

const mockRepository = jest.fn(() => ({
  metadata: {
    columns: [],
    relations: [],
  },
}));

describe('DoctorAssemblerService', () => {
  let service: UserAssemblerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserAssemblerService,
        UserAssembler,
        DoctorDatabaseService,
        {
          provide: getRepositoryToken(DoctorEntity),
          useClass: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserAssemblerService>(UserAssemblerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
