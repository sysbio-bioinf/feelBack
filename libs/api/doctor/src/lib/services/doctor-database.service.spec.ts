import { Test, TestingModule } from '@nestjs/testing';
import { DoctorDatabaseService } from './doctor-database.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DoctorEntity } from '@feelback-app/api/data';

const mockRepository = jest.fn(() => ({
  metadata: {
    columns: [],
    relations: [],
  },
}));

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
