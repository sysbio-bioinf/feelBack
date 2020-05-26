import { ApplicationGuardModule } from '@cancerlog/api/application';
import { ConfigModule, ConfigService } from '@cancerlog/api/config';
import {
  DoctorEntity,
  FaqEntity,
  IdentityEntity,
  InstrumentEntity,
  OrganizationEntity,
  PersonEntity,
  ScreeningEntity,
} from '@cancerlog/api/data';
import { environment } from '@env-cancerlog-api/environment';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { IDENTITY_DB_CONNECTION_NAME } from '@cancerlog/api/database';
import { ApiModule } from './modules/api.module';
import { ScalarModule } from './modules/scalar.module';

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
    ConfigModule.forRoot(environment),
    TypeOrmModule.forRootAsync({
      // name: FEELBACK_DB_CONNECTION_NAME,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        ...configService.get('dbConnections.feelback'),
        entities: feelbackEntities,
      }),
    }),
    TypeOrmModule.forRootAsync({
      name: IDENTITY_DB_CONNECTION_NAME,
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
