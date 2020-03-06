import { Module, HttpModule } from '@nestjs/common';
import { KeycloakService } from './services/keycloak.service';

const strategies = [KeycloakService];

@Module({
  imports: [HttpModule],
  providers: [...strategies],
  exports: [...strategies],
})
export class AuthModule {}
