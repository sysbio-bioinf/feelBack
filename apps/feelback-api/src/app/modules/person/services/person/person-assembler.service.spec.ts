import { Test, TestingModule } from '@nestjs/testing';
import { PersonAssemblerService } from './person-assembler.service';
import { PersonEntity } from '../../data/entities/person.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PersonAssembler } from '../../ui/graphql/assemblers/person.assembler';
import { PersonDatabaseService } from './person-database.service';

const mockRepository = jest.fn(() => ({
  metadata: {
    columns: [],
    relations: [],
  },
}));

describe('PersonAssemblerService', () => {
  let service: PersonAssemblerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PersonAssemblerService,
        PersonAssembler,
        PersonDatabaseService,
        {
          provide: getRepositoryToken(PersonEntity),
          useClass: mockRepository,
        },
      ],
    }).compile();

    service = module.get<PersonAssemblerService>(PersonAssemblerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
