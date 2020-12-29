import { PersonEntity } from '@feelback-app/api/data';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PersonDatabaseService } from './person-database.service';
import { activePerson } from '@feelback-app/api/testing';

const mockRepository = {
  findOneOrFail: jest.fn((options?: any) => Promise.resolve(activePerson)),
};

describe('PersonDatabaseService', () => {
  let service: PersonDatabaseService;

  beforeEach(async () => {
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
    // Since getPersonByPseudonym has no logic for catching error produced by findOneOrFail, there won't be a test case checking for this.
    it('should return by correct pseudonym', () => {
      expect.assertions(1);
      return expect(
        service.getPersonByPseudonym(activePerson.pseudonym),
      ).resolves.toStrictEqual(activePerson);
    });
  });
});
