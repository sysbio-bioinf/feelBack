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
import { CreateOnePersonInputType } from '@feelback-app/api/interfaces';
import { ApiException } from '@feelback-app/api/errors';
import {
  activePerson,
  inactivePerson,
  mockIdentityEntity,
  mockRepository,
} from '@feelback-app/api/testing';

describe('PersonResolver', () => {
  let resolver: PersonResolver;
  let personAssemblerService: PersonAssemblerService;
  let personDatabaseService: PersonDatabaseService;
  let identityDatabaseService: IdentityDatabaseService;

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
          useClass: mockRepository,
        },
      ],
    }).compile();

    resolver = module.get<PersonResolver>(PersonResolver);
    personAssemblerService = module.get<PersonAssemblerService>(
      PersonAssemblerService,
    );
    personDatabaseService = module.get<PersonDatabaseService>(
      PersonDatabaseService,
    );
    identityDatabaseService = module.get<IdentityDatabaseService>(
      IdentityDatabaseService,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
    expect(personAssemblerService).toBeDefined();
    expect(personDatabaseService).toBeDefined();
    expect(identityDatabaseService).toBeDefined();
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
      const mockIdentityCreateOne = jest.fn().mockResolvedValueOnce(null);
      identityDatabaseService.createOne = mockIdentityCreateOne;
      // Call method
      try {
        await resolver.createOnePerson(input);
        fail();
      } catch (error) {
        // Excpect
        expect(error).toBeInstanceOf(ApiException);
      }
      expect(mockIdentityCreateOne).toBeCalledTimes(1);
      expect(mockIdentityCreateOne).toBeCalledWith({
        pseudonym: input.input.pseudonym,
      });
    });

    it('should return PersonObject', async () => {
      // Set mocks
      const mockIdentityCreateOne = jest
        .fn()
        .mockResolvedValueOnce(mockIdentityEntity);
      identityDatabaseService.createOne = mockIdentityCreateOne;
      const mockPersonCreateOne = jest.fn();
      personAssemblerService.createOne = mockPersonCreateOne;
      // Call method
      await resolver.createOnePerson(input);
      // Expect
      expect(mockIdentityCreateOne).toBeCalledTimes(1);
      expect(mockIdentityCreateOne).toBeCalledWith({
        pseudonym: input.input.pseudonym,
      });
      expect(mockPersonCreateOne).toBeCalledTimes(1);
      expect(mockPersonCreateOne).toBeCalledWith(input.input);
    });
  });

  describe('personByPseudonym', () => {
    it('should return active person', async () => {
      // Set mocks
      const mockPersonFindOneOrFail = jest
        .fn()
        .mockResolvedValueOnce(activePerson);
      personDatabaseService.repo.findOneOrFail = mockPersonFindOneOrFail;
      const mockConvertToDTO = jest.fn();
      personAssemblerService.assembler.convertToDTO = mockConvertToDTO;
      // Call method
      await resolver.personByPseudonym(activePerson.pseudonym);
      // Expect
      expect(mockPersonFindOneOrFail).toBeCalledTimes(1);
      expect(mockPersonFindOneOrFail).toBeCalledWith({
        where: { pseudonym: activePerson.pseudonym },
      });
      expect(mockConvertToDTO).toBeCalledTimes(1);
      expect(mockConvertToDTO).toBeCalledWith(activePerson);
    });

    it('should throw error if person is inactive', async () => {
      // Set mocks
      const mockPersonFindOneOrFail = jest
        .fn()
        .mockResolvedValueOnce(inactivePerson);
      personDatabaseService.repo.findOneOrFail = mockPersonFindOneOrFail;
      // Call method
      try {
        await resolver.personByPseudonym(inactivePerson.pseudonym);
        fail();
      } catch (error) {
        // Expect
        expect(error).toBeInstanceOf(ApiException);
      }
      expect(mockPersonFindOneOrFail).toBeCalledTimes(1);
      expect(mockPersonFindOneOrFail).toBeCalledWith({
        where: { pseudonym: inactivePerson.pseudonym },
      });
    });
  });
});
