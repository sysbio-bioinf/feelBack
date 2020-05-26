import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { IDENTITY_DB_CONNECTION } from '../../../../../constants/db.constants';
import { IdentityEntity } from '@cancerlog/api/data';
import { IdentityDatabaseService } from '../../../../identity/services/identity/identity-database.service';
import { PersonEntity } from '../../../data/entities/person.entity';
import { PersonAssemblerService } from '../../../services/person/person-assembler.service';
import { PersonDatabaseService } from '../../../services/person/person-database.service';
import { PersonAssembler } from '../assemblers/person.assembler';
import { PersonResolver } from './person.resolver';

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
      imports: [],
      providers: [
        PersonResolver,
        PersonAssembler,
        PersonAssemblerService,
        PersonDatabaseService,
        IdentityDatabaseService,
        {
          provide: getRepositoryToken(PersonEntity),
          useClass: mockRepository,
        },
        {
          provide: getRepositoryToken(IdentityEntity, IDENTITY_DB_CONNECTION),
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
