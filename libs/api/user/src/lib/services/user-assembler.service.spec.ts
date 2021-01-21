import { DoctorEntity } from '@feelback-app/api/data';
import { DoctorObject } from '@feelback-app/api/interfaces';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserAssembler } from '../ui/graphql/assemblers/user.assembler';
import { UserAssemblerService } from './user-assembler.service';
import { UserDatabaseService } from './user-database.service';
import { mockDoctorEntity } from '@feelback-app/api/testing';

const mockFindOneOrFail: jest.Mock<Promise<DoctorEntity>> = jest.fn();
const mockDoctorRepository = {
  findOneOrFail: mockFindOneOrFail,
};

describe('UserAssemblerService', () => {
  let service: UserAssemblerService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserAssemblerService,
        UserAssembler,
        UserDatabaseService,
        {
          provide: getRepositoryToken(DoctorEntity),
          useValue: mockDoctorRepository,
        },
      ],
    }).compile();

    service = module.get<UserAssemblerService>(UserAssemblerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUserByKeycloakId', () => {
    const expectedOptions = {
      where: {
        keycloakId: mockDoctorEntity.keycloakId,
      },
    };

    it('should return user object', async () => {
      // Set mock to return DoctorEntity
      mockFindOneOrFail.mockResolvedValueOnce(mockDoctorEntity);
      // Call method
      const result = await service.getUserByKeycloakId(
        mockDoctorEntity.keycloakId,
      );
      // Expect
      expect(result).toBeInstanceOf(DoctorObject);
      expect(result).toMatchObject<DoctorObject>({ ...mockDoctorEntity });
      expect(mockFindOneOrFail).toBeCalledTimes(1);
      expect(mockFindOneOrFail).toBeCalledWith(expectedOptions);
    });
  });
});
