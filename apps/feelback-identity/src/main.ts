import { environment as env } from '@env-cancerlog-identity/environment';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app/app.module';
import { Logger, ValidationPipe, HttpStatus } from '@nestjs/common';
import * as compression from 'compression';
import * as helmet from 'helmet';
import { CoreException } from '@cancerlog/api/core';
import { ExceptionFilter } from '@cancerlog/api/application';

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
        new CoreException(
          {
            detail: 'Validation Error',
            status: HttpStatus.PRECONDITION_FAILED,
            debug: {
              location: 'ValidationPipe',
            },
            error: errors,
          },
          HttpStatus.PRECONDITION_FAILED,
        ),
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
