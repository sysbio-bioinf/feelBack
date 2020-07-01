import { DoctorEntity } from '@feelback-app/api/data';
import { mockRepository } from '@feelback-app/api/testing';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserDatabaseService } from './user-database.service';

describe('UserDatabaseService', () => {
  let service: UserDatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserDatabaseService,
        {
          provide: getRepositoryToken(DoctorEntity),
          useClass: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserDatabaseService>(UserDatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
