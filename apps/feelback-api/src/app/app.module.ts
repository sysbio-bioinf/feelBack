import { GuardsModule, GqlMasterGuard } from '@feelback-app/api/auth';
import { ConfigModule, ConfigService } from '@feelback-app/api/config';
import {
  DoctorEntity,
  FaqEntity,
  IdentityEntity,
  InstrumentEntity,
  OrganizationEntity,
  PersonEntity,
  ScreeningEntity,
} from '@feelback-app/api/data';
import { IDENTITY_DB_CONNECTION_NAME } from '@feelback-app/api/database';
import { environment } from '@env-feelback-app-api/environment';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ApiModule } from './modules/api.module';
import { ScalarModule } from './modules/scalar.module';
import { APP_GUARD } from '@nestjs/core';

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
    GuardsModule,
    ScalarModule,
    ApiModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GqlMasterGuard,
    },
  ],
})
export class AppModule {}
