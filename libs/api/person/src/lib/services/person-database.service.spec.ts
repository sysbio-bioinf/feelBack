import { PersonEntity } from '@feelback-app/api/data';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PersonDatabaseService } from './person-database.service';
import { activePerson } from '@feelback-app/api/testing';

const mockFindOneOrFail: jest.Mock<Promise<
  PersonEntity
>> = jest.fn().mockResolvedValue(activePerson);
const mockRepository = {
  findOneOrFail: mockFindOneOrFail,
};

describe('PersonDatabaseService', () => {
  let service: PersonDatabaseService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PersonDatabaseService,
        {
          provide: getRepositoryToken(PersonEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<PersonDatabaseService>(PersonDatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getPersonByPseudonym', () => {
    const expectedOptions = {
      where: {
        pseudonym: activePerson.pseudonym,
      },
    };

    // Since getPersonByPseudonym has no logic for catching error produced by findOneOrFail, there won't be a test case checking for this.
    it('should return by correct pseudonym', async () => {
      const result = await service.getPersonByPseudonym(activePerson.pseudonym);
      expect(result).toStrictEqual(activePerson);
      expect(mockFindOneOrFail).toBeCalledTimes(1);
      expect(mockFindOneOrFail).toBeCalledWith(expectedOptions);
    });
  });
});
