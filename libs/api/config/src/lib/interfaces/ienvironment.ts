import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { GqlModuleOptions } from '@nestjs/graphql';
import { ExpressJwtOptions } from 'jwks-rsa';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface IEnv {
  LOG_LEVEL: LogLevel;
  [k: string]: string;
}

export interface IEnvironment {
  /**
   * the environment the app is running
   */
  env: {
    name: string;
    production: boolean;
    meta?: IEnv;
  };

  auth: {
    keycloak?: {
      host: {
        url: string;
      };
      config: ExpressJwtOptions;
      clients: {
        realm: string;
        client: string;
        scope: string;
      }[];
    };
    jwt?: {
      /**
       * the JWT secret
       */
      secret: string;

      /**
       * the APP UUID that is used to sign the tokens
       */
      issuer: string;

      /**
       * the url that is used to generate the token
       */
      audience: string;

      /**
       * Custom options for the JWT module
       * @see https://github.com/auth0/node-jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback
       */
      options: object;
    };
  };

  server: {
    host: string;
    url: string;
    port: number;
    apiPrefix: string;
  };

  database?: TypeOrmModuleOptions;

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
