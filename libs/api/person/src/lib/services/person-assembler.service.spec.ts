import { PersonEntity } from '@feelback-app/api/data';
import { mockRepository } from '@feelback-app/api/testing';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PersonAssembler } from '../ui/graphql/assemblers/person.assembler';
import { PersonAssemblerService } from './person-assembler.service';
import { PersonDatabaseService } from './person-database.service';

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
