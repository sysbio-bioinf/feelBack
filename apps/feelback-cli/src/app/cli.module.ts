import {
  DoctorEntity,
  FaqEntity,
  IdentityEntity,
  InstrumentEntity,
  OrganizationEntity,
  PersonEntity,
  ScreeningEntity,
} from '@feelback-app/api/data';
import {
  feelbackDatabaseConnection,
  identityDatabaseConnection,
  IDENTITY_DB_CONNECTION_NAME,
} from '@feelback-app/api/database';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleModule } from 'nestjs-console';
import { DBClearCommand } from './commands/database/db-clear.command';
import { DBSeedCommand } from './commands/database/db-seed.command';
import { EchoCommand } from './commands/echo.command';

const registeredCommands = [EchoCommand, DBSeedCommand, DBClearCommand];

export const feelbackEntities = [
  DoctorEntity,
  FaqEntity,
  InstrumentEntity,
  OrganizationEntity,
  PersonEntity,
  ScreeningEntity,
];

export const identityEntities = [IdentityEntity];

@Module({
  imports: [
    ConsoleModule,
    TypeOrmModule.forRoot({
      ...feelbackDatabaseConnection,
      // name: FEELBACK_DB_CONNECTION_NAME,
      entities: feelbackEntities,
    }),
    TypeOrmModule.forRoot({
      ...identityDatabaseConnection,
      name: IDENTITY_DB_CONNECTION_NAME,
      entities: identityEntities,
    }),
  ],
  providers: [...registeredCommands],
  exports: [...registeredCommands],
})
export class CliModule {}
