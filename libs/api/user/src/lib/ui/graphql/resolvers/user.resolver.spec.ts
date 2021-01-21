import { DoctorEntity } from '@feelback-app/api/data';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  UserAssemblerService,
  UserDatabaseService,
} from '@feelback-app/api/user';
import { UserAssembler } from '../assemblers/user.assembler';
import { UserResolver } from './user.resolver';
import { CredentialsDto, KeycloakService, User } from '@feelback-app/api/auth';
import { ConfigModule } from '@feelback-app/api/config';
import {
  mockDoctorEntity,
  mockEmptyEnvironment,
  mockRepository,
} from '@feelback-app/api/testing';
import { HttpModule } from '@nestjs/common';
import {
  RegisterInput,
  UpdateUserInput,
  UserObject,
} from '@feelback-app/api/interfaces';
import { ApiException } from '@feelback-app/api/errors';
import { DeepPartial } from '@nestjs-query/core';

describe('UserResolver', () => {
  let resolver: UserResolver;
  let keycloakService: KeycloakService;
  let userAssemblerService: UserAssemblerService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(mockEmptyEnvironment), HttpModule],
      providers: [
        KeycloakService,
        UserResolver,
        UserAssemblerService,
        UserDatabaseService,
        UserAssembler,
        {
          provide: getRepositoryToken(DoctorEntity),
          useClass: mockRepository,
        },
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
    keycloakService = module.get<KeycloakService>(KeycloakService);
    userAssemblerService = module.get<UserAssemblerService>(
      UserAssemblerService,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
    expect(keycloakService).toBeDefined();
    expect(userAssemblerService).toBeDefined();
  });

  describe('getKeycloakUserInfo', () => {
    it('should return user', async () => {
      const user = new User('id');
      const result = await resolver.getKeycloakUserInfo(user);
      expect(result).toStrictEqual(user);
    });
  });

  describe('myself', () => {
    const user = new User(mockDoctorEntity.keycloakId);

    it('should return user object', async () => {
      const mockGetUserByKeycloakId = jest.fn();
      userAssemblerService.getUserByKeycloakId = mockGetUserByKeycloakId;
      await resolver.myself(user);
      expect(mockGetUserByKeycloakId).toBeCalledTimes(1);
      expect(mockGetUserByKeycloakId).toBeCalledWith(user.id);
    });
  });

  describe('updateMyself', () => {
    const user = new User(mockDoctorEntity.keycloakId);
    const settings = { test: 'testSettings' };
    const input: UpdateUserInput = {
      settings: settings,
    };
    const userObject: UserObject = { ...mockDoctorEntity };

    it('should return user object', async () => {
      // Set mocks
      const mockGetUserByKeycloakId = jest.fn().mockResolvedValue(userObject);
      userAssemblerService.getUserByKeycloakId = mockGetUserByKeycloakId;
      const mockUpdateOne = jest.fn();
      userAssemblerService.updateOne = mockUpdateOne;
      // Call method. Checking return value isn't needed.
      await resolver.updateMyself(user, input);
      // Expect
      expect(mockGetUserByKeycloakId).toBeCalledTimes(1);
      expect(mockGetUserByKeycloakId).toBeCalledWith(user.id);
      expect(mockUpdateOne).toBeCalledTimes(1);
      expect(mockUpdateOne).toBeCalledWith(userObject.id, input);
    });
  });

  describe('registerUser', () => {
    const input: RegisterInput = {
      email: 'test@uni-ulm.de',
      password: 'passw',
    };
    const expectedCredentials: CredentialsDto = {
      username: input.email,
      password: input.password,
    };
    const expectedPartialDoctor: DeepPartial<DoctorEntity> = {
      keycloakId: mockDoctorEntity.keycloakId,
      acceptedTOS: true,
      isActive: true,
    };

    it('should return user object', async () => {
      // Set mocks
      const mockRegisterDoctor = jest
        .fn()
        .mockResolvedValue(mockDoctorEntity.keycloakId);
      keycloakService.registerDoctor = mockRegisterDoctor;
      const mockCreateOne = jest.fn().mockResolvedValue(mockDoctorEntity);
      userAssemblerService.queryService.createOne = mockCreateOne;
      // Call method. Checking return value isn't needed.
      const result = await resolver.registerUser(input);
      expect(result).toBeInstanceOf(UserObject);
      expect(result).toMatchObject<UserObject>({ ...mockDoctorEntity });
      // Expect
      expect(mockRegisterDoctor).toBeCalledTimes(1);
      expect(mockRegisterDoctor).toBeCalledWith(expectedCredentials);
      expect(mockCreateOne).toBeCalledTimes(1);
      expect(mockCreateOne).toBeCalledWith(expectedPartialDoctor);
    });

    it('should throw error if registerDoctor failed', async () => {
      const mockRegisterDoctor = jest.fn(() => {
        throw new Error();
      });
      keycloakService.registerDoctor = mockRegisterDoctor;
      try {
        await resolver.registerUser(input);
        fail();
      } catch (error) {
        expect(error).toBeInstanceOf(ApiException);
      }
      expect(mockRegisterDoctor).toBeCalledTimes(1);
      expect(mockRegisterDoctor).toBeCalledWith(expectedCredentials);
    });
  });
});
