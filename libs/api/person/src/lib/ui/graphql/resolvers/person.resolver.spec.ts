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
  mockRepository,
} from '@feelback-app/api/testing';

// Mock repository of PersonDatabaseService
const mockPersonRepoFindOneOrFail: jest.Mock<Promise<PersonEntity>> = jest.fn();
const mockPersonRepository = {
  findOneOrFail: mockPersonRepoFindOneOrFail,
};

// Mock createOne of IdentityDatabaseService
const mockIdentityServiceCreateOne: jest.Mock<Promise<
  IdentityEntity
>> = jest.fn();
// Mock createOne of PersonAssemblerService
const mockPersonServiceCreateOne: jest.Mock<Promise<PersonObject>> = jest.fn();

describe('PersonResolver', () => {
  let resolver: PersonResolver;

  beforeEach(async () => {
    jest.clearAllMocks();

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
          useClass: mockRepository,
        },
        PersonDatabaseService,
        {
          provide: getRepositoryToken(PersonEntity),
          useValue: mockPersonRepository,
        },
      ],
    }).compile();

    resolver = module.get<PersonResolver>(PersonResolver);

    // Set mock for PersonAssemblerService
    const personAssemblerService = module.get<PersonAssemblerService>(
      PersonAssemblerService,
    );
    personAssemblerService.createOne = mockPersonServiceCreateOne;
    // Set mock for IdentityDatabaseService
    const identityDatabaseService = module.get<IdentityDatabaseService>(
      IdentityDatabaseService,
    );
    identityDatabaseService.createOne = mockIdentityServiceCreateOne;
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createOnePerson', () => {
    const input: CreateOnePersonInputType = {
      input: {
        ...activePerson,
        pseudonym: activePerson.pseudonym,
      },
    };

    it('should throw error if createOne failed', async () => {
      // Set mocks
      // creatOne fails by returning falsy value, e.g. null.
      mockIdentityServiceCreateOne.mockResolvedValueOnce(
        (null as unknown) as IdentityEntity,
      );
      // Call method
      try {
        await resolver.createOnePerson(input);
        fail();
      } catch (error) {
        // Expect
        expect(error).toBeInstanceOf(ApiException);
      }
      expect(mockIdentityServiceCreateOne).toBeCalledTimes(1);
      expect(mockIdentityServiceCreateOne).toBeCalledWith({
        pseudonym: input.input.pseudonym,
      });
    });

    it('should return PersonObject', async () => {
      // Set mocks
      mockIdentityServiceCreateOne.mockResolvedValueOnce(mockIdentityEntity);
      // Call method
      await resolver.createOnePerson(input);
      // Expect
      expect(mockIdentityServiceCreateOne).toBeCalledTimes(1);
      expect(mockIdentityServiceCreateOne).toBeCalledWith({
        pseudonym: input.input.pseudonym,
      });
      expect(mockPersonServiceCreateOne).toBeCalledTimes(1);
      expect(mockPersonServiceCreateOne).toBeCalledWith(input.input);
    });
  });

  describe('personByPseudonym', () => {
    it('should return active person', async () => {
      // Set mocks
      mockPersonRepoFindOneOrFail.mockResolvedValueOnce(activePerson);
      // Call method
      const result = await resolver.personByPseudonym(activePerson.pseudonym);
      expect(result).toBeInstanceOf(PersonObject);
      expect(result).toMatchObject<PersonObject>({ ...activePerson });
      // Expect
      expect(mockPersonRepoFindOneOrFail).toBeCalledTimes(1);
      expect(mockPersonRepoFindOneOrFail).toBeCalledWith({
        where: { pseudonym: activePerson.pseudonym },
      });
    });

    it('should throw error if person is inactive', async () => {
      // Set mocks
      mockPersonRepoFindOneOrFail.mockResolvedValueOnce(inactivePerson);
      // Call method
      try {
        await resolver.personByPseudonym(inactivePerson.pseudonym);
        fail();
      } catch (error) {
        // Expect
        expect(error).toBeInstanceOf(ApiException);
      }
      expect(mockPersonRepoFindOneOrFail).toBeCalledTimes(1);
      expect(mockPersonRepoFindOneOrFail).toBeCalledWith({
        where: { pseudonym: inactivePerson.pseudonym },
      });
    });
  });
});
