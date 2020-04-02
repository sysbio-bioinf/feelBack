import { environment } from '@env-cancerlog-api/environment';
import { Module } from '@nestjs/common';
import { ApiModule } from './modules/api.module';
import { ConfigModule, ConfigService } from '@cancerlog/api/config';
import { OrganizationEntity } from './modules/organization/data/entities/organization.entity';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { InstrumentEntity } from './modules/instrument/data/entities/instrument.entity';
import { ScalarModule } from './modules/scalar.module';
import { ScreeningEntity } from './modules/screening/data/entities/screening.entity';
import { PersonEntity } from './modules/person/data/entities/person.entity';
import { DoctorEntity } from './modules/doctor/data/entities/doctor.entity';
import { ApplicationGuardModule } from '@cancerlog/api/application';
import { IdentityEntity } from './modules/identity/data/entities/identity.entity';
import { IDENTITY_DB_CONNECTION } from './constants/db.constants';

const feelbackEntities = [
  DoctorEntity,
  InstrumentEntity,
  OrganizationEntity,
  PersonEntity,
  ScreeningEntity,
];

const identityEntities = [IdentityEntity];

@Module({
  imports: [
    ConfigModule.forRoot(environment),
    TypeOrmModule.forRootAsync({
      // name: FEELBACK_DB_CONNECTION,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        ...configService.get('dbConnections.feelback'),
        entities: feelbackEntities,
      }),
    }),
    TypeOrmModule.forRootAsync({
      name: IDENTITY_DB_CONNECTION,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        ...configService.get('dbConnections.identity'),
        entities: identityEntities,
      }),
    }),
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('graphql'),
        context: ({ req }) => ({ req }),
      }),
    }),
    ScalarModule,
    ApplicationGuardModule,
    ApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
