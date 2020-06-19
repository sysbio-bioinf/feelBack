import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { GqlRoleGuard } from './guards/gql-role.guard';
import { KeycloakStrategy } from './keycloak-bearer.strategy';

const guards = [GqlAuthGuard, GqlRoleGuard];

/**
 * Provides authentication guards and decorators for use in the API project.
 */
@Module({
  imports: [PassportModule.register({ defaultStrategy: 'keycloak-bearer' })],
  providers: [KeycloakStrategy, ...guards],
  exports: [...guards],
})
export class AuthModule {}
