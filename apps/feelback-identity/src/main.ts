import { environment as env } from '@env-cancerlog-identity/environment';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app/app.module';
import { Logger } from '@nestjs/common';
import * as compression from 'compression';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const globalPrefix = env.server.apiPrefix;
  app.setGlobalPrefix(globalPrefix);

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
