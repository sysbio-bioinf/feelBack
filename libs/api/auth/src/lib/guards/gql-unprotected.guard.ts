import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { DECORATOR_METADATA } from '../constants/decorator.constants';

@Injectable()
export class GqlUnprotectedGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  /**
   * Inspects the `unprotected` meta data of the called query / mutation (handler) and
   * its resolver (class). If the unprotected data is set (i.e., it is equal to TRUE),
   * it passes validation!
   *
   * @param context {ExecutionContext} the execution context
   * @returns true, if the this query / mutation or entire resolver should not be protected
   */
  canActivate(context: ExecutionContext): boolean {
    const unprotected = this.reflector.getAllAndOverride<boolean>(
      DECORATOR_METADATA.API_UNPROTECTED,
      [context.getHandler(), context.getClass()],
    );

    // there is no decorator assigned - therefore we do not have access!
    // because this decorator is called UNPROTECTED (which is NOT set!)
    if (!unprotected) {
      return false;
    }

    return unprotected;
  }
}
