import { AuthModule } from '@cancerlog/api/authentication';
import { ConfigModule } from '@cancerlog/api/config';
import { environment } from '@env-cancerlog-api/environment';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationResolver } from './authentication.resolver';

const mockRepository = jest.fn(() => ({
  metadata: {
    columns: [],
    relations: [],
  },
}));

describe('AuthenticationResolver', () => {
  let resolver: AuthenticationResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule, ConfigModule.forRoot(environment)],
      providers: [AuthenticationResolver],
    }).compile();

    resolver = module.get<AuthenticationResolver>(AuthenticationResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
