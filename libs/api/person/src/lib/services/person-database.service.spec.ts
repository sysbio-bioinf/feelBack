import { PersonEntity } from '@feelback-app/api/data';
import { mockRepository } from '@feelback-app/api/testing';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PersonDatabaseService } from './person-database.service';

describe('PersonDatabaseService', () => {
  let service: PersonDatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PersonDatabaseService,
        {
          provide: getRepositoryToken(PersonEntity),
          useClass: mockRepository,
        },
      ],
    }).compile();

    service = module.get<PersonDatabaseService>(PersonDatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
