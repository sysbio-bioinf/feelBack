import { ExceptionFilter } from '@cancerlog/api/application';
import { EC_VALIDATION_FAILED, ExceptionModel } from '@cancerlog/api/errors';
import { environment as env } from '@env-cancerlog-api/environment';
import {
  Logger,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as compression from 'compression';
import * as helmet from 'helmet';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const globalPrefix = env.server.apiPrefix;
  app.setGlobalPrefix(globalPrefix);

  app.useGlobalFilters(new ExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      skipMissingProperties: false,
      forbidUnknownValues: true,
      exceptionFactory: (errors) =>
        new UnprocessableEntityException({
          code: EC_VALIDATION_FAILED.code,
          title: 'Validation Exception',
          message: 'Validation failed',
          error: errors,
          source: 'ValidationPipe',
        } as ExceptionModel),
    }),
  );

  if (env.platform.compression.enabled === true) {
    app.use(compression());
  }

  if (env.platform.helmet.enabled === true) {
    app.use(helmet());
  }

  if (env.platform.cors.enabled === true) {
    app.enableCors(env.platform.cors.options);
  }

  const port = env.server.port;
  await app.listen(port, () => {
    Logger.log(`Listening at ${env.server.url}${globalPrefix}`, 'Bootstrap');
  });
}

bootstrap();
