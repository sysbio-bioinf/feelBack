import { Test, TestingModule } from '@nestjs/testing';
import { PersonResolver } from './person.resolver';
import { PersonAssembler } from '../assemblers/person.assembler';
import { PersonAssemblerService } from '../../../services/person/person-assembler.service';
import { PersonEntity } from '../../../data/entities/person.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PersonDatabaseService } from '../../../services/person/person-database.service';
import { HttpModule } from '@nestjs/common';

const mockRepository = jest.fn(() => ({
  metadata: {
    columns: [],
    relations: [],
  },
}));

describe('PersonResolver', () => {
  let resolver: PersonResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        PersonResolver,
        PersonAssembler,
        PersonAssemblerService,
        PersonDatabaseService,
        {
          provide: getRepositoryToken(PersonEntity),
          useClass: mockRepository,
        },
      ],
    }).compile();

    resolver = module.get<PersonResolver>(PersonResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
