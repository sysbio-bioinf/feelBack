import { Global, Module } from '@nestjs/common';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { GqlMasterGuard } from './guards/gql-master.guard';
import { GqlRoleGuard } from './guards/gql-role.guard';
import { GqlUnprotectedGuard } from './guards/gql-unprotected.guard';

const guards = [
  GqlMasterGuard,
  GqlAuthGuard,
  GqlRoleGuard,
  GqlUnprotectedGuard,
];

/**
 * Provides authentication guards.
 */
@Global()
@Module({
  providers: [...guards],
  exports: [...guards],
})
export class GuardsModule {}
