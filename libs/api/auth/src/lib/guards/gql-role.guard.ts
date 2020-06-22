import {
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from '../data/classes/user.class';
import { DECORATOR_METADATA } from '../constants/decorator.constants';
import {
  EC_AUTH_ROLE_BEFORE_JWT_GUARD,
  ExceptionMessageModel,
} from '@cancerlog/api/errors';

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
      throw new InternalServerErrorException({
        code: EC_AUTH_ROLE_BEFORE_JWT_GUARD.code,
        title: 'Authentication Exception',
        message: EC_AUTH_ROLE_BEFORE_JWT_GUARD.description,
        source: 'RoleGuard',
      } as ExceptionMessageModel);
    }

    const hasRole = () =>
      user.roles.some((role: string) => roles.includes(role));

    return !!user && !!user.roles && hasRole();
  }
}
