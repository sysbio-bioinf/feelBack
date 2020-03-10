import { Injectable } from '@nestjs/common';
import { AbstractMasterGuard } from '../core/abstract-master.guard';
import { GraphqlJwtGuard } from './graphql-jwt.guard';
import { GraphqlRealmGuard } from './graphql-realm.guard';
import { GraphqlRoleGuard } from './graphql-role.guard';

@Injectable()
export class GraphqlMasterGuard extends AbstractMasterGuard {
  constructor(
    protected realmGuard: GraphqlRealmGuard,
    protected jwtGuard: GraphqlJwtGuard,
    protected roleGuard: GraphqlRoleGuard,
  ) {
    super(realmGuard, jwtGuard, roleGuard);
  }
}
