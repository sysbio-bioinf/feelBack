import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { GqlAuthGuard } from './gql-auth.guard';
import { GqlRoleGuard } from './gql-role.guard';

/**
 * Master guard for GraphQL requests.
 */
@Injectable()
export class GqlMasterGuard implements CanActivate {
  constructor(
    private authGuard: GqlAuthGuard,
    private roleGuard: GqlRoleGuard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authGuardResult = await this.authGuard.canActivate(context);
    const roleGuardResult = await this.roleGuard.canActivate(context);

    return authGuardResult && roleGuardResult;
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
