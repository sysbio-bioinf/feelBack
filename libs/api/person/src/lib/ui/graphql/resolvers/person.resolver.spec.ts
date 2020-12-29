import { GuardsModule } from '@feelback-app/api/auth';
import { IdentityEntity, PersonEntity } from '@feelback-app/api/data';
import { IDENTITY_DB_CONNECTION_NAME } from '@feelback-app/api/database';
import { IdentityDatabaseService } from '@feelback-app/api/identity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PersonAssemblerService } from '../../../services/person-assembler.service';
import { PersonDatabaseService } from '../../../services/person-database.service';
import { PersonAssembler } from '../assemblers/person.assembler';
import { PersonResolver } from './person.resolver';
import {
  CreateOnePersonInputType,
  PersonObject,
} from '@feelback-app/api/interfaces';
import { ApiException } from '@feelback-app/api/errors';
import {
  activePerson,
  inactivePerson,
  mockIdentityEntity,
} from '@feelback-app/api/testing';

// Mock repository with PersonEntity
export const mockPersonEntityRepository = {
  findOneOrFail: jest.fn((options?: any) => {
    // return inactive Person so 'personByPseudonym' fails
    if (
      !options ||
      !options.where ||
      options.where.pseudonym !== activePerson.pseudonym
    ) {
      return Promise.resolve(inactivePerson);
    }
    return Promise.resolve(activePerson);
  }),
};

// Define pseudonym to indicate failure for createOne
const failPseudonym = 'fail!';
// Mock repository with IdentityEntity
const mockIdentityEntityRepository = {
  createOne: jest.fn((record: any) => {
    // Returns null to indicate failure
    if (!record.pseudonym || record.pseudonym === failPseudonym) {
      return Promise.resolve(null);
    }
    return Promise.resolve(mockIdentityEntity);
  }),
};

// Expected PersonDTO from activePerson
const expectedActivePersonObject: PersonObject = {
  pseudonym: activePerson.pseudonym,
  acceptedTOS: activePerson.acceptedTOS,
  version: activePerson.version,
  id: activePerson.id,
  createdAt: activePerson.createdAt,
  updatedAt: activePerson.updatedAt,
};

describe('PersonResolver', () => {
  let resolver: PersonResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [GuardsModule],
      providers: [
        PersonResolver,
        PersonAssembler,
        PersonAssemblerService,
        IdentityDatabaseService,
        {
          provide: getRepositoryToken(
            IdentityEntity,
            IDENTITY_DB_CONNECTION_NAME,
          ),
          useValue: mockIdentityEntityRepository,
        },
        PersonDatabaseService,
        {
          provide: getRepositoryToken(PersonEntity),
          useValue: mockPersonEntityRepository,
        },
      ],
    }).compile();

    resolver = module.get<PersonResolver>(PersonResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  // FIXME: Mocking IdentityEntityDatabase doesn't work.
  describe('createOnePerson', () => {
    it('should throw error if createOne failed', () => {
      expect.assertions(1);
      const input: CreateOnePersonInputType = {
        input: {
          pseudonym: failPseudonym,
        },
      };
      return expect(resolver.createOnePerson(input)).rejects.toThrow(
        ApiException,
      );
    });

    it('should return PersonObject', async () => {
      const input: CreateOnePersonInputType = {
        input: {
          ...activePerson,
          pseudonym: activePerson.pseudonym,
        },
      };
      const result = await resolver.createOnePerson(input);
      expect(result).toMatchObject<PersonObject>(expectedActivePersonObject);
    });
  });

  describe('personByPseudonym', () => {
    it('should return active person', async () => {
      const result = await resolver.personByPseudonym(activePerson.pseudonym);
      expect(result).toMatchObject({ isActive: true });
      expect(result).toBeInstanceOf(PersonObject);
    });

    it('should fail with inactive person', () => {
      expect.assertions(1);
      return expect(
        resolver.personByPseudonym(inactivePerson.pseudonym),
      ).rejects.toThrow(ApiException);
    });
  });
});
