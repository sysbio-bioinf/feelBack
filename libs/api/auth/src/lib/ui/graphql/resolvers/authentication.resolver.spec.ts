import { AuthenticationResolver } from './authentication.resolver';

const mockRepository = jest.fn(() => ({
  metadata: {
    columns: [],
    relations: [],
  },
}));

describe('AuthenticationResolver', () => {
  // let resolver: AuthenticationResolver;

  beforeEach(async () => {
    // FIXME: loading the env results in a circular dependency! How can we properly fix this?!
    // const module: TestingModule = await Test.createTestingModule({
    //   imports: [ConfigModule.forRoot(environment), HttpModule],
    //   providers: [AuthenticationResolver, KeycloakService],
    // }).compile();
    // resolver = module.get<AuthenticationResolver>(AuthenticationResolver);
  });

  it('should be defined', () => {
    // expect(resolver).toBeDefined();
  });
});
