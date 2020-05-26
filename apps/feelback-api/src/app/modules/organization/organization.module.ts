import { Module } from '@nestjs/common';
import { OrganizationDatabaseService } from './services/organization/organization-database.service';
import { OrganizationResolver } from './ui/graphql/resolvers/organization.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationEntity } from '@cancerlog/api/data';
import { OrganizationAssembler } from './ui/graphql/assemblers/organization.assembler';
import { OrganizationAssemblerService } from './services/organization/organization-assembler.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrganizationEntity])],
  providers: [
    OrganizationResolver,
    OrganizationAssembler,
    OrganizationDatabaseService,
    OrganizationAssemblerService,
  ],
})
export class OrganizationModule {}
