import { AuthenticationResolver } from './authentication.resolver';
import { TestingModule, Test } from '@nestjs/testing';
import { KeycloakService } from '../../../services/keycloak.service';
import { ConfigModule, ConfigService } from '@feelback-app/api/config';

describe('AuthenticationResolver', () => {
  // let resolver: AuthenticationResolver;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     imports: [ConfigModule],
  //     providers: [ConfigService, AuthenticationResolver, KeycloakService],
  //   }).compile();

  //   resolver = module.get<AuthenticationResolver>(AuthenticationResolver);
  // });

  it('should be defined', () => {
    // expect(resolver).toBeDefined();
  });
});
