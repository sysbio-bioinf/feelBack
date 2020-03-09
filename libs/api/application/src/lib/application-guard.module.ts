import { Module, Global } from '@nestjs/common';
import { GraphqlMasterGuard } from './flow/guards/graphql/graphql-master.guard';
import { GraphqlRealmGuard } from './flow/guards/graphql/graphql-realm.guard';

const graphqlGuards = [
  // GraphqlJwtGuard,
  GraphqlMasterGuard,
  GraphqlRealmGuard,
  // GraphqlRoleGuard,
];

@Global()
@Module({
  providers: [...graphqlGuards],
  exports: [...graphqlGuards],
})
export class ApplicationGuardModule {}
