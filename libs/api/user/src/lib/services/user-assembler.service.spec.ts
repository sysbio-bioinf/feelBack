import { DoctorEntity } from '@feelback-app/api/data';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserAssembler } from '../ui/graphql/assemblers/user.assembler';
import { UserAssemblerService } from './user-assembler.service';
import { UserDatabaseService } from './user-database.service';
import { mockDoctorEntity, mockRepository } from '@feelback-app/api/testing';

describe('UserAssemblerService', () => {
  let service: UserAssemblerService;
  let userDataBaseService: UserDatabaseService;
  let userAssembler: UserAssembler;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserAssemblerService,
        UserAssembler,
        UserDatabaseService,
        {
          provide: getRepositoryToken(DoctorEntity),
          useClass: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserAssemblerService>(UserAssemblerService);
    userAssembler = module.get<UserAssembler>(UserAssembler);
    userDataBaseService = module.get<UserDatabaseService>(UserDatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userDataBaseService).toBeDefined();
  });

  describe('getUserByKeycloakId', () => {
    it('should return user object', async () => {
      // Set mocks
      const mockGetUserByKeycloakId = jest
        .fn()
        .mockResolvedValueOnce(mockDoctorEntity);
      userDataBaseService.getUserByKeycloakId = mockGetUserByKeycloakId;
      const mockConvertToDTO = jest.fn();
      userAssembler.convertAsyncToDTO = mockConvertToDTO;
      // Call method. Checking return value isn't needed.
      await service.getUserByKeycloakId(mockDoctorEntity.keycloakId);
      // Expect
      expect(mockGetUserByKeycloakId).toBeCalledTimes(1);
      expect(mockGetUserByKeycloakId).toBeCalledWith(
        mockDoctorEntity.keycloakId,
      );
      expect(mockConvertToDTO).toBeCalledTimes(1);
      expect(mockConvertToDTO).toBeCalledWith(
        Promise.resolve(mockDoctorEntity),
      );
    });
  });
});
