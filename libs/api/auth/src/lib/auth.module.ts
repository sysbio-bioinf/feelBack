import { Module, HttpModule } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { GqlRoleGuard } from './guards/gql-role.guard';
import { KeycloakStrategy } from './strategies/keycloak-bearer.strategy';
import { ConfigModule } from '@cancerlog/api/config';
import { KeycloakService } from './services/keycloak.service';
import { AuthenticationResolver } from './ui/graphql/resolvers/authentication.resolver';

const guards = [GqlAuthGuard, GqlRoleGuard];

/**
 * Provides authentication guards and decorators for use in the API project.
 */
@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'keycloak-bearer' }),
    HttpModule,
  ],
  providers: [
    KeycloakStrategy,
    KeycloakService,
    AuthenticationResolver,
    ...guards,
  ],
  exports: [...guards],
})
export class AuthModule {}
