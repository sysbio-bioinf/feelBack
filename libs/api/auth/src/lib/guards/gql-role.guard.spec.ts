import { RolesEnum } from '@feelback-app/api/shared';
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../data/classes/user.class';
import { GqlRoleGuard } from './gql-role.guard';

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
    gqlRoleGuard.getRequest = jest.fn(() => request);
    context = module.get<ExecutionContext>(ExecutionContextHost);
    reflector = module.get<any>(Reflector);
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
});
