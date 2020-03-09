import { Injectable } from '@nestjs/common';
import { AbstractRealmGuard } from '../core/abstract-realm.guard';
import { Reflector } from '@nestjs/core';

@Injectable()
export class GraphqlRealmGuard extends AbstractRealmGuard {
  constructor(protected reflector: Reflector) {
    super(reflector);
  }
}
