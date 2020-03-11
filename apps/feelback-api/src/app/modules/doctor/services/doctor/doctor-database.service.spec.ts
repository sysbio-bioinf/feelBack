import { Test, TestingModule } from '@nestjs/testing';
import { DoctorDatabaseService } from './doctor-database.service';

describe('DoctorDatabaseService', () => {
  let service: DoctorDatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoctorDatabaseService],
    }).compile();

    service = module.get<DoctorDatabaseService>(DoctorDatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
