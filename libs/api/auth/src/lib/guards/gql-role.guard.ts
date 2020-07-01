import { ApiException } from '@feelback-app/api/errors';
import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { DECORATOR_METADATA } from '../constants/decorator.constants';
import { User } from '../data/classes/user.class';

@Injectable()
export class GqlRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  /**
   * Inspects the `roles` meta data of the called query / mutation (handler) and
   * its resolver (class). Roles set on queries (function level) override roles
   * set on resolvers (class level). If there are multiple roles provided in
   * the meta data, it is sufficient for the user to possess any one of those.
   *
   * @param context {ExecutionContext} the execution context
   * @returns true, if the user has any of the required roles or there is no
   * role required; false, otherwise
   */
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<string[]>(
      DECORATOR_METADATA.API_ROLE,
      [context.getHandler(), context.getClass()],
    );

    if (!roles) {
      return true;
    }

    const request = this.getRequest(context);
    const user: User = request.user;

    if (!user) {
      throw new ApiException(
        {
          title: 'Authentication Exception',
          message:
            'Cannot resolve a user from the JWT. Did you accidentally call the RoleGuard before the AuthGuard?',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const hasRole = () =>
      user.roles.some((role: string) => roles.includes(role));

    return !!user && !!user.roles && hasRole();
  }
}
