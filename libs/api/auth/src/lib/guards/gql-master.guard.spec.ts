import { GqlMasterGuard } from './gql-master.guard';
import { GqlAuthGuard } from './gql-auth.guard';
import { GqlRoleGuard } from './gql-role.guard';
import { GqlUnprotectedGuard } from './gql-unprotected.guard';
import { Reflector } from '@nestjs/core';
import { ExecutionContext } from '@nestjs/common';

// Return Object as ExecutionContext containing wanted results for each canActivate-Method
const mockActivateResult = (
  unprotectedGuardResult: boolean,
  authGuardResult: boolean,
  roleGuardResult: boolean,
): ExecutionContext => {
  return ({
    mockUnprotectedResult: unprotectedGuardResult,
    mockAuthResult: authGuardResult,
    mockRoleResult: roleGuardResult,
  } as unknown) as ExecutionContext;
};

// Return corresponding boolean
const mockUnprotectedGuard = jest.fn(
  (context: any) => context.mockUnprotectedResult,
);
const mockAuthGuard = jest.fn((context: any) => context.mockAuthResult);
const mockRoleGuard = jest.fn((context: any) => context.mockRoleResult);

describe('GqlMasterGuard', () => {
  let gqlMasterGuard: GqlMasterGuard;
  let gqlUnprotectedGuard: GqlUnprotectedGuard;
  let gqlAuthGuard: GqlAuthGuard;
  let gqlRoleGuard: GqlRoleGuard;

  beforeEach(async () => {
    const emptyReflector: Reflector = new Reflector();
    gqlUnprotectedGuard = new GqlUnprotectedGuard(emptyReflector);
    gqlAuthGuard = new GqlAuthGuard();
    gqlRoleGuard = new GqlRoleGuard(emptyReflector);
    gqlMasterGuard = new GqlMasterGuard(
      gqlUnprotectedGuard,
      gqlAuthGuard,
      gqlRoleGuard,
    );

    gqlUnprotectedGuard.canActivate = mockUnprotectedGuard;
    gqlAuthGuard.canActivate = mockAuthGuard;
    gqlRoleGuard.canActivate = mockRoleGuard;
  });

  it('should be defined', () => {
    expect(gqlMasterGuard).toBeDefined();
    expect(gqlUnprotectedGuard).toBeDefined();
    expect(gqlAuthGuard).toBeDefined();
    expect(gqlRoleGuard).toBeDefined();
  });

  describe('canActivate', () => {
    it('should activate if context is unprotected', async () => {
      let result = await gqlMasterGuard.canActivate(
        mockActivateResult(true, true, true),
      );
      expect(result).toBe(true);
      result = await gqlMasterGuard.canActivate(
        mockActivateResult(true, true, false),
      );
      expect(result).toBe(true);
      result = await gqlMasterGuard.canActivate(
        mockActivateResult(true, false, true),
      );
      expect(result).toBe(true);
      result = await gqlMasterGuard.canActivate(
        mockActivateResult(true, false, false),
      );
      expect(result).toBe(true);
    });

    it('should activate if context is protected, AuthGuard and RoleGuard return true', async () => {
      const result = await gqlMasterGuard.canActivate(
        mockActivateResult(false, true, true),
      );
      expect(result).toBe(true);
    });

    it("shouldn't activate for protected context, AuthGuard or RoleGuard return false", async () => {
      let result = await gqlMasterGuard.canActivate(
        mockActivateResult(false, false, true),
      );
      expect(result).toBe(false);
      result = await gqlMasterGuard.canActivate(
        mockActivateResult(false, true, false),
      );
      expect(result).toBe(false);
      result = await gqlMasterGuard.canActivate(
        mockActivateResult(false, false, false),
      );
      expect(result).toBe(false);
    });
  });
});
