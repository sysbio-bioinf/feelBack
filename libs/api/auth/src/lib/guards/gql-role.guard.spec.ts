import { ApiException } from '@feelback-app/api/errors';
import { RolesEnum } from '@feelback-app/api/shared';
import {
  mockGqlExecutionContext,
  mockRequest,
} from '@feelback-app/api/testing';
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../data/classes/user.class';
import { GqlRoleGuard } from './gql-role.guard';

const mockGqlExecutionCreate = jest
  .fn()
  .mockReturnValue(mockGqlExecutionContext);
GqlExecutionContext.create = mockGqlExecutionCreate;

class ReflectorMock {
  handlerRoles: string | string[] | undefined;
  classRoles: string | string[] | undefined;

  getAllAndOverride = jest.fn((metaDataKey: string, targets: any[]) => {
    return this.handlerRoles || this.classRoles;
  });
}

describe('RoleGuard', () => {
  let gqlRoleGuard: GqlRoleGuard;
  let context: ExecutionContext;
  let reflector: ReflectorMock;
  let request: { user: User };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GqlRoleGuard,
        Reflector,
        ExecutionContextHost,
        {
          provide: Reflector,
          useClass: ReflectorMock,
        },
      ],
    }).compile();

    gqlRoleGuard = module.get<GqlRoleGuard>(GqlRoleGuard);
    context = module.get<ExecutionContext>(ExecutionContextHost);
    reflector = module.get<any>(Reflector);
  });

  it('should be defined', () => {
    expect(gqlRoleGuard).toBeDefined();
    expect(context).toBeDefined();
    expect(reflector).toBeDefined();
  });

  describe('getRequest', () => {
    it('should return request', () => {
      const result = gqlRoleGuard.getRequest(context);
      expect(result).toStrictEqual(mockRequest);
      expect(mockGqlExecutionCreate).toBeCalledTimes(1);
      expect(mockGqlExecutionCreate).toBeCalledWith(context);
    });
  });

  describe('canActivate', () => {
    beforeEach(() => {
      // Set mock after test for getRequest
      gqlRoleGuard.getRequest = jest.fn(() => request);
    });

    it('should allow access if user has no roles and there are no required roles', async () => {
      request = { user: new User('id') };

      const accessAllowed = gqlRoleGuard.canActivate(context);
      expect(accessAllowed).toBe(true);
    });

    it('should allow access if user has roles and there are no required roles', async () => {
      request = { user: new User('id', [RolesEnum.MANAGER]) };

      const accessAllowed = gqlRoleGuard.canActivate(context);
      expect(accessAllowed).toBe(true);
    });

    it('should deny access if user has no roles but there are required roles', async () => {
      request = { user: new User('id') };
      reflector.handlerRoles = [RolesEnum.USER];

      const accessAllowed = gqlRoleGuard.canActivate(context);
      expect(accessAllowed).toBe(false);
    });

    it('should deny access if user has no proper role', async () => {
      request = { user: new User('id', [RolesEnum.USER]) };
      reflector.handlerRoles = [RolesEnum.MANAGER, RolesEnum.ADMIN];

      const accessAllowed = gqlRoleGuard.canActivate(context);
      expect(accessAllowed).toBe(false);
    });

    it('should allow access if user has at least one proper role', async () => {
      request = { user: new User('id', [RolesEnum.ADMIN, RolesEnum.MANAGER]) };
      reflector.handlerRoles = [RolesEnum.MANAGER, RolesEnum.USER];

      const accessAllowed = gqlRoleGuard.canActivate(context);
      expect(accessAllowed).toBe(true);
    });

    it('should allow access if user has role defined on class level and there are no roles defined on handler level', async () => {
      request = { user: new User('id', [RolesEnum.MANAGER]) };
      reflector.handlerRoles = undefined;
      reflector.classRoles = [RolesEnum.MANAGER];

      const accessAllowed = gqlRoleGuard.canActivate(context);
      expect(accessAllowed).toBe(true);
    });

    it('should deny access if user has role defined on class level but there are different roles defined on handler level', async () => {
      request = { user: new User('id', [RolesEnum.MANAGER]) };
      reflector.handlerRoles = [RolesEnum.USER];
      reflector.classRoles = [RolesEnum.MANAGER];
      const accessAllowed = gqlRoleGuard.canActivate(context);

      expect(accessAllowed).toBe(false);
    });

    it('should allow access if user has role defined on handler level and there are different roles defined on class level', async () => {
      request = { user: new User('id', [RolesEnum.MANAGER]) };
      reflector.handlerRoles = [RolesEnum.MANAGER];
      reflector.classRoles = [RolesEnum.USER];

      const accessAllowed = gqlRoleGuard.canActivate(context);
      expect(accessAllowed).toBe(true);
    });

    it("should throw error if user can't be resolved", () => {
      request = { user: (null as unknown) as User };
      reflector.handlerRoles = [RolesEnum.MANAGER];

      expect(() => gqlRoleGuard.canActivate(context)).toThrow(ApiException);
    });
  });
});
