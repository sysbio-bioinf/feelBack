import {
  DoctorEntity,
  FaqEntity,
  IdentityEntity,
  InstrumentEntity,
  OrganizationEntity,
  PersonEntity,
  ScreeningEntity,
} from '@cancerlog/api/data';
import {
  feelbackDatabaseConnection,
  identityDatabaseConnection,
  IDENTITY_DB_CONNECTION_NAME,
} from '@cancerlog/api/database';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleModule } from 'nestjs-console';
import { DBSetupCommand } from './commands/db-setup.command';
import { EchoCommand } from './commands/echo.command';

const registeredCommands = [EchoCommand, DBSetupCommand];

const feelbackEntities = [
  DoctorEntity,
  FaqEntity,
  InstrumentEntity,
  OrganizationEntity,
  PersonEntity,
  ScreeningEntity,
];

const identityEntities = [IdentityEntity];

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
