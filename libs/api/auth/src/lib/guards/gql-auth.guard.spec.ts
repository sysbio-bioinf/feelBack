import {
  mockGqlExecutionContext,
  mockRequest,
} from '@feelback-app/api/testing';
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { GqlExecutionContext } from '@nestjs/graphql';
import { TestingModule, Test } from '@nestjs/testing';
import { GqlAuthGuard } from './gql-auth.guard';

const mockGqlExecutionCreate = jest
  .fn()
  .mockReturnValue(mockGqlExecutionContext);
GqlExecutionContext.create = mockGqlExecutionCreate;

describe('GqlAuthGuard', () => {
  let gqlAuthGuard: GqlAuthGuard;
  let context: ExecutionContext;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [GqlAuthGuard, Reflector, ExecutionContextHost],
    }).compile();

    gqlAuthGuard = module.get<GqlAuthGuard>(GqlAuthGuard);
    context = module.get<ExecutionContext>(ExecutionContextHost);
  });

  it('should be defined', () => {
    expect(gqlAuthGuard).toBeDefined();
    expect(context).toBeDefined();
  });

  describe('getRequest', () => {
    it('should return context', () => {
      const result = gqlAuthGuard.getRequest(context);
      expect(result).toStrictEqual(mockRequest);
      expect(mockGqlExecutionCreate).toBeCalledTimes(1);
      expect(mockGqlExecutionCreate).toBeCalledWith(context);
    });
  });
});
