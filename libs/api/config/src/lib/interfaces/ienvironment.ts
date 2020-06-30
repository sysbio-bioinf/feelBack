import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { GqlModuleOptions } from '@nestjs/graphql';
import { ExpressJwtOptions } from 'jwks-rsa';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface IEnvironment {
  /**
   * the environment the app is running
   */
  env: {
    name: string;
    production: boolean;
    logLevel: LogLevel;
    meta?: object;
  };

  auth: {
    keycloak?: {
      server: {
        host: string;
        username: string;
        password: string;
      };
      config: ExpressJwtOptions;
      clients: {
        [k: string]: {
          realm: string;
          client: string;
          scope: string;
        };
      };
    };
  };

  server: {
    host: string;
    url: string;
    port: number;
    apiPrefix: string;
  };

  database?: TypeOrmModuleOptions;

  dbConnections?: {
    [name: string]: TypeOrmModuleOptions;
  };

  graphql?: GqlModuleOptions;

  /**
   * Some basic configuration options for the platform itself, like rate-limiting, i18n, cors, ...
   */
  platform: {
    compression: {
      enabled: boolean;
    };
    cors: {
      enabled: boolean;
      /**
       * custom options to added for the CORS middleware
       * @see https://github.com/expressjs/cors#configuration-options
       */
      options: CorsOptions;
    };
    helmet: {
      enabled: boolean;
    };
    i18n?: {
      defaultLanguage: string;
      fallbackLanguage: string;
      availableLanguages: string[];
    };
    ratelimit: {
      enabled: boolean;
      /**
       * the amount of requests you are able to make in a certain period
       */
      attempts: number;

      /**
       * the period in minutes after the limit expires
       */
      interval: number;
    };
  };
}
