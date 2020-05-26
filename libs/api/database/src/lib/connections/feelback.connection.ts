import * as dotenv from 'dotenv';
import * as env from 'env-var';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

dotenv.config();

export const feelbackDatabaseConnection: TypeOrmModuleOptions = {
  // name: FEELBACK_DB_CONNECTION,
  type: env.get('FB_DB_TYPE').default('postgres').asString() as 'postgres',
  host: env.get('FB_DB_HOST').default('localhost').asString(),
  port: env.get('FB_DB_PORT').default(5432).asPortNumber(),
  database: env.get('FB_DB_NAME').default('postgres').asString(),
  username: env.get('FB_DB_USER').default('postgres').asString(),
  password: env.get('FB_DB_PASSWORD').default('postgres').asString(),
  keepConnectionAlive: true,
  logging: env.get('FB_DB_DEBUG').default('true').asBoolStrict(),
  synchronize: true,
  uuidExtension: 'pgcrypto',
};
