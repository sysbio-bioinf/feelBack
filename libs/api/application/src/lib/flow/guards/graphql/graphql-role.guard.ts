import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AbstractRoleGuard } from '../core/abstract-role.guard';
import { Reflector } from '@nestjs/core';

@Injectable()
export class GraphqlRoleGuard extends AbstractRoleGuard {
  constructor(protected reflector: Reflector) {
    super(reflector);
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
