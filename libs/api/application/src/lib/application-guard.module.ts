import { Global, Module } from '@nestjs/common';
import { GraphqlJwtGuard } from './flow/guards/graphql/graphql-jwt.guard';
import { GraphqlMasterGuard } from './flow/guards/graphql/graphql-master.guard';
import { GraphqlRealmGuard } from './flow/guards/graphql/graphql-realm.guard';
import { GraphqlRoleGuard } from './flow/guards/graphql/graphql-role.guard';

const graphqlGuards = [
  GraphqlJwtGuard,
  GraphqlMasterGuard,
  GraphqlRealmGuard,
  GraphqlRoleGuard,
];

@Global()
@Module({
  providers: [...graphqlGuards],
  exports: [...graphqlGuards],
})
export class ApplicationGuardModule {}
