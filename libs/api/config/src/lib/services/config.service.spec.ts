import { Test } from '@nestjs/testing';
import { ConfigService } from './config.service';
import { ConfigModule } from '../config.module';

describe('ConfigService', () => {
  let configService: ConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          env: {
            name: 'TESTING',
            production: false,
            meta: {
              LOG_LEVEL: 'debug',
              foo: 'bar',
            },
          },
          auth: {},
          database: {},
          graphql: {},
          server: {
            apiPrefix: 'api',
            host: 'localhost',
            port: 1234,
            url: 'http://localhost:1234',
          },
          platform: {
            compression: {
              enabled: false,
            },
            cors: {
              enabled: false,
              options: {},
            },
            helmet: {
              enabled: false,
            },
            ratelimit: {
              enabled: false,
              attempts: 100,
              interval: 1,
            },
            i18n: {
              defaultLanguage: 'en',
              availableLanguages: ['en'],
              fallbackLanguage: 'en',
            },
          },
        }),
      ],
    }).compile();

    configService = module.get<ConfigService>(ConfigService);
  });

  describe('init', () => {
    it('should be correctly instantiated', () => {
      expect(configService).toBeTruthy();
    });

    it('should be able to read values', () => {
      expect(configService.get('env.name')).toEqual('TESTING');
      expect(configService.get('server.port')).toEqual(1234);
    });

    it('should be able to call methods', () => {
      expect(configService.isProduction()).toBeFalsy();
      expect(configService.getKeyCloakUriForRealm('foo')).toBeTruthy();
    });
  });
});
