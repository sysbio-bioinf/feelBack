import { ExecutionContext, CanActivate } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DECORATOR_METADATA } from '../../../constants/decorator.constants';
import { ApiRealmsEnum } from '../../../enums/api-realms.enum';

export abstract class AbstractRealmGuard implements CanActivate {
  constructor(protected reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const endpointRealm = this.reflector.get<string>(
      DECORATOR_METADATA.API_REALM,
      context.getHandler(),
    );

    // there was no realm submitted - locked by default
    if (endpointRealm === null || endpointRealm === undefined) {
      return false;
    }

    if (endpointRealm === ApiRealmsEnum.PUBLIC) {
      return true;
    }

    return false;
  }
}
