import { IdentityEntity, PersonEntity } from '@feelback-app/api/data';
import { IDENTITY_DB_CONNECTION_NAME } from '@feelback-app/api/database';
import { IdentityDatabaseService } from '@feelback-app/api/identity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PersonAssemblerService } from '../../../services/person-assembler.service';
import { PersonDatabaseService } from '../../../services/person-database.service';
import { PersonAssembler } from '../assemblers/person.assembler';
import { PersonResolver } from './person.resolver';
import { GuardsModule } from '@feelback-app/api/auth';

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
      imports: [GuardsModule],
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
          provide: getRepositoryToken(
            IdentityEntity,
            IDENTITY_DB_CONNECTION_NAME,
          ),
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
