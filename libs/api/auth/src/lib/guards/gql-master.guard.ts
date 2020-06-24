import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GqlAuthGuard } from './gql-auth.guard';
import { GqlRoleGuard } from './gql-role.guard';
import { GqlUnprotectedGuard } from './gql-unprotected.guard';

/**
 * Master guard for GraphQL requests.
 */
@Injectable()
export class GqlMasterGuard implements CanActivate {
  constructor(
    private unprotectedGuard: GqlUnprotectedGuard,
    private authGuard: GqlAuthGuard,
    private roleGuard: GqlRoleGuard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const unprotectedGuardResult = await this.unprotectedGuard.canActivate(
      context,
    );

    if (unprotectedGuardResult === true) {
      return true;
    }

    const authGuardResult = await this.authGuard.canActivate(context);
    const roleGuardResult = await this.roleGuard.canActivate(context);

    return authGuardResult && roleGuardResult;
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
