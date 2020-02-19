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

const availableEntities = [
  DoctorEntity,
  InstrumentEntity,
  OrganizationEntity,
  PersonEntity,
  ScreeningEntity
];

@Module({
  imports: [
    ConfigModule.forRoot(environment),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        ...configService.get('database'),
        entities: availableEntities
      })
    }),
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('graphql'),
        context: ({ req }) => ({ req })
      })
    }),
    ScalarModule,
    ApiModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
