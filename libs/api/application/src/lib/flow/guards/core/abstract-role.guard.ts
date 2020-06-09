import {
  EC_AUTH_ROLE_BEFORE_JWT_GUARD,
  ExceptionMessageModel,
} from '@cancerlog/api/errors';
import {
  CanActivate,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as _ from 'lodash';
import { DECORATOR_METADATA } from '../../../constants/decorator.constants';
import { REQUEST_FIELDS } from '../../../constants/request-fields.constants';

export abstract class AbstractRoleGuard implements CanActivate {
  constructor(protected reflector: Reflector) {}

  abstract getRequest(context: ExecutionContext): any;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    let endpointRoles = this.reflector.get<string[]>(
      DECORATOR_METADATA.API_ROLE,
      context.getHandler(),
    );

    if (!endpointRoles || endpointRoles.length === 0) {
      return true;
    }

    endpointRoles = endpointRoles.map((role) => role.toLocaleLowerCase());

    // get the request
    const request = this.getRequest(context);

    const user = _.get(request, REQUEST_FIELDS.AUTH_USER);
    const authInfo = _.get(request, REQUEST_FIELDS.AUTH_INFO);

    // check the user
    if (!user) {
      throw new InternalServerErrorException({
        code: EC_AUTH_ROLE_BEFORE_JWT_GUARD.code,
        title: 'Authentication Exception',
        message: EC_AUTH_ROLE_BEFORE_JWT_GUARD.description,
        source: 'RoleGuard',
      } as ExceptionMessageModel);
    }

    // ok, and now we need to check the roles of the user!
    const userRoles: string[] = authInfo.token.realm_access.roles;

    return (
      userRoles.filter(
        (role) => endpointRoles.indexOf(role.toLocaleLowerCase()) !== -1,
      ).length > 0
    );
  }
}
