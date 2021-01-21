import { Test } from '@nestjs/testing';
import { ConfigService } from './config.service';
import { ConfigModule } from '../config.module';
import { mockEmptyEnvironment } from '@feelback-app/api/testing';

describe('ConfigService', () => {
  let configService: ConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(mockEmptyEnvironment)],
    }).compile();

    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(configService).toBeDefined();
  });

  describe('get', () => {
    it('should return value', () => {
      const environmentName = 'envorinmentName';
      mockEmptyEnvironment.env.name = environmentName;
      expect(configService.get('env.name')).toStrictEqual(environmentName);
      const serverPort = 8080;
      mockEmptyEnvironment.server.port = serverPort;
      expect(configService.get('server.port')).toStrictEqual(serverPort);
    });

    const emptyAttribute = '';
    const invalidAttribute = 'definitelyNonExistantAttribute';

    it('should return undefined for invalid attribute', () => {
      expect(configService.get(emptyAttribute)).toBeUndefined();
      expect(configService.get(invalidAttribute)).toBeUndefined();
    });

    it('should return default value for invalid attribute', () => {
      const defaultValue = { mock: 'default' };
      expect(configService.get(emptyAttribute, defaultValue)).toStrictEqual(
        defaultValue,
      );
      expect(configService.get(invalidAttribute, defaultValue)).toStrictEqual(
        defaultValue,
      );
    });
  });

  describe('isProduction', () => {
    it('should return env.production value', () => {
      mockEmptyEnvironment.env.production = true;
      expect(configService.isProduction()).toBe(true);
      mockEmptyEnvironment.env.production = false;
      expect(configService.isProduction()).toBe(false);
    });
  });
});
