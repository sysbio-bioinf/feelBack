import { Module } from '@nestjs/common';
import { OrganizationService } from './services/organization.service';
import { OrganizationResolver } from './ui/graphql/resolvers/organization.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationEntity } from './data/entities/organization.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrganizationEntity])],
  providers: [OrganizationService, OrganizationResolver]
})
export class OrganizationModule {}
