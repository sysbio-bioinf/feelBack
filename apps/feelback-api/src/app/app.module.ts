import { environment } from '@env-cancerlog-identity/environment';
import { Module } from '@nestjs/common';
import { ApiModule } from './modules/api.module';
import { ConfigModule, ConfigService } from '@cancerlog/api/config';
import { OrganizationEntity } from './modules/organization/data/entities/organization.entity';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';

const availableEntities = [OrganizationEntity];

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
    ApiModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
