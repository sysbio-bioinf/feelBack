import { ConfigModule } from '@cancerlog/api/config';
import { HttpModule, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { KeycloakService } from './services/keycloak.service';
import { KeycloakStrategy } from './strategies/keycloak-bearer.strategy';
import { AuthenticationResolver } from './ui/graphql/resolvers/authentication.resolver';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'keycloak-bearer' }),
    HttpModule,
  ],
  providers: [KeycloakStrategy, KeycloakService, AuthenticationResolver],
  exports: [KeycloakService, KeycloakStrategy],
})
export class AuthModule {}
