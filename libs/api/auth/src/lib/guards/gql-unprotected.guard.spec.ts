import {
  mockGqlExecutionContext,
  mockRequest,
} from '@feelback-app/api/testing';
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Test, TestingModule } from '@nestjs/testing';
import { GqlUnprotectedGuard } from './gql-unprotected.guard';

const mockGqlExecutionCreate = jest
  .fn()
  .mockReturnValue(mockGqlExecutionContext);
GqlExecutionContext.create = mockGqlExecutionCreate;

class ReflectorMock {
  handlerUnprotected: boolean | undefined;
  classUnprotected: boolean | undefined;

  getAllAndOverride = jest.fn((metaDataKey: string, targets: any[]) => {
    return this.handlerUnprotected || this.classUnprotected;
  });
}

describe('UnprotectedGuard', () => {
  let gqlUnprotectedGuard: GqlUnprotectedGuard;
  let context: ExecutionContext;
  let reflector: ReflectorMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GqlUnprotectedGuard,
        Reflector,
        ExecutionContextHost,
        {
          provide: Reflector,
          useClass: ReflectorMock,
        },
      ],
    }).compile();

    gqlUnprotectedGuard = module.get<GqlUnprotectedGuard>(GqlUnprotectedGuard);
    context = module.get<ExecutionContext>(ExecutionContextHost);
    reflector = module.get<any>(Reflector);
  });

  it('should be defined', () => {
    expect(gqlUnprotectedGuard).toBeDefined();
    expect(context).toBeDefined();
    expect(reflector).toBeDefined();
  });

  describe('getRequest', () => {
    it('should return request', () => {
      const result = gqlUnprotectedGuard.getRequest(context);
      expect(result).toStrictEqual(mockRequest);
      expect(mockGqlExecutionCreate).toBeCalledTimes(1);
      expect(mockGqlExecutionCreate).toBeCalledWith(context);
    });
  });

  describe('canActivate', () => {
    beforeEach(() => {
      // Set mock after getRequest gets tested
      gqlUnprotectedGuard.getRequest = jest.fn(() => {});
    });

    it('should disallow access if no decorator is assigned', async () => {
      const accessAllowed = gqlUnprotectedGuard.canActivate(context);
      expect(accessAllowed).toBe(false);
    });

    it('should allow access if a decorator is assigned to this method', async () => {
      reflector.handlerUnprotected = true;
      reflector.classUnprotected = undefined;

      const accessAllowed = gqlUnprotectedGuard.canActivate(context);
      expect(accessAllowed).toBe(true);
    });

    it('should allow access if a decorator is assigned to this class', async () => {
      reflector.handlerUnprotected = undefined;
      reflector.classUnprotected = true;

      const accessAllowed = gqlUnprotectedGuard.canActivate(context);
      expect(accessAllowed).toBe(true);
    });

    it('should allow access if a decorator is assigned to this class and method', async () => {
      reflector.handlerUnprotected = true;
      reflector.classUnprotected = true;

      const accessAllowed = gqlUnprotectedGuard.canActivate(context);
      expect(accessAllowed).toBe(true);
    });
  });
});
