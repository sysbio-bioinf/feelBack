import { Test, TestingModule } from '@nestjs/testing';
import { UserDatabaseService } from './user-database.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DoctorEntity } from '@feelback-app/api/data';

const mockRepository = jest.fn(() => ({
  metadata: {
    columns: [],
    relations: [],
  },
}));

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
