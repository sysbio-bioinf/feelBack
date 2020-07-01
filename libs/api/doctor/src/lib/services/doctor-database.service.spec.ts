import { DoctorEntity } from '@feelback-app/api/data';
import { mockRepository } from '@feelback-app/api/testing';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DoctorDatabaseService } from './doctor-database.service';

describe('DoctorDatabaseService', () => {
  let service: DoctorDatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DoctorDatabaseService,
        {
          provide: getRepositoryToken(DoctorEntity),
          useClass: mockRepository,
        },
      ],
    }).compile();

    service = module.get<DoctorDatabaseService>(DoctorDatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
