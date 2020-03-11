import { Test, TestingModule } from '@nestjs/testing';
import { PersonDatabaseService } from './person-database.service';

describe('PersonDatabaseService', () => {
  let service: PersonDatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonDatabaseService],
    }).compile();

    service = module.get<PersonDatabaseService>(PersonDatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
