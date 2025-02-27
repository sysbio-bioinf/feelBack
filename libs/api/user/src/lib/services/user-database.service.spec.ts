import { DoctorEntity } from '@feelback-app/api/data';
import { mockDoctorEntity } from '@feelback-app/api/testing';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserDatabaseService } from './user-database.service';

const mockFindOneOrFail: jest.Mock<Promise<DoctorEntity>> = jest.fn();
const mockRepository = {
  findOneOrFail: mockFindOneOrFail,
};

describe('UserDatabaseService', () => {
  let service: UserDatabaseService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserDatabaseService,
        {
          provide: getRepositoryToken(DoctorEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserDatabaseService>(UserDatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUserByKeycloakId', () => {
    const keycloakId = 'keycloakIdTest';
    const expectedOptions = {
      where: {
        keycloakId: keycloakId,
      },
    };

    // Since getUserByKeycloakId has no logic for catching error produced by findOneOrFail, there won't be a test case checking for this.
    it('should return doctor', async () => {
      mockFindOneOrFail.mockResolvedValueOnce(mockDoctorEntity);
      const result = await service.getUserByKeycloakId(keycloakId);
      expect(result).toStrictEqual(mockDoctorEntity);
      expect(mockFindOneOrFail).toBeCalledTimes(1);
      expect(mockFindOneOrFail).toBeCalledWith(expectedOptions);
    });
  });
});
