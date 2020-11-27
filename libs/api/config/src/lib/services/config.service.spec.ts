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

  describe('init', () => {
    it('should be correctly instantiated', () => {
      expect(configService).toBeTruthy();
    });

    it('should be able to read values', () => {
      expect(configService.get('env.name')).toStrictEqual(
        mockEmptyEnvironment.env.name,
      );
      expect(configService.get('server.port')).toStrictEqual(
        mockEmptyEnvironment.server.port,
      );
    });

    it('should return default value', () => {
      const invalidAttribute = '';
      expect(configService.get(invalidAttribute)).toBeUndefined();
      const defaultValue = { mock: 'default' };
      expect(configService.get(invalidAttribute, defaultValue)).toStrictEqual(
        defaultValue,
      );
    });

    it('should be able to call methods', () => {
      expect(configService.isProduction()).toBe(
        mockEmptyEnvironment.env.production,
      );
    });
  });
});
