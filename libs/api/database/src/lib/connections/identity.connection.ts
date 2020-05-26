import * as dotenv from 'dotenv';
import * as env from 'env-var';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { IDENTITY_DB_CONNECTION_NAME } from '../constants/db.constants';

dotenv.config();

export const identityDatabaseConnection: TypeOrmModuleOptions = {
  name: IDENTITY_DB_CONNECTION_NAME,
  type: env.get('ID_DB_TYPE').default('postgres').asString() as 'postgres',
  host: env.get('ID_DB_HOST').default('localhost').asString(),
  port: env.get('ID_DB_PORT').default(5432).asPortNumber(),
  database: env.get('ID_DB_NAME').default('postgres').asString(),
  username: env.get('ID_DB_USER').default('postgres').asString(),
  password: env.get('ID_DB_PASSWORD').default('postgres').asString(),
  keepConnectionAlive: true,
  logging: env.get('ID_DB_DEBUG').default('true').asBoolStrict(),
  synchronize: true,
  uuidExtension: 'pgcrypto',
};
