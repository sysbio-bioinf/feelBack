import { ConnectionOptions } from 'typeorm';
import { IdentityEntity } from './modules/identity/data/entities/identity.entity';

export const availableEntities = [IdentityEntity];

export const TEST_CONNECTION_OPTIONS: ConnectionOptions = {
  type: 'sqlite',
  database: ':memory:',
  dropSchema: true,
  synchronize: true,
  logging: false,
  entities: availableEntities,
};
