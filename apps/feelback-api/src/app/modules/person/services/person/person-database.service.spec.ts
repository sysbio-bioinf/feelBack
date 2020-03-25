import { Test, TestingModule } from '@nestjs/testing';
import { PersonDatabaseService } from './person-database.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PersonEntity } from '../../data/entities/person.entity';

const mockRepository = jest.fn(() => ({
  metadata: {
    columns: [],
    relations: [],
  },
}));

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
