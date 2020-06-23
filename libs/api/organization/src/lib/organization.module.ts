import { AuthModule } from '@cancerlog/api/auth';
import { OrganizationEntity } from '@cancerlog/api/data';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationAssemblerService } from './services/organization-assembler.service';
import { OrganizationDatabaseService } from './services/organization-database.service';
import { OrganizationAssembler } from './ui/graphql/assemblers/organization.assembler';
import { OrganizationResolver } from './ui/graphql/resolvers/organization.resolver';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([OrganizationEntity])],
  providers: [
    OrganizationResolver,
    OrganizationAssembler,
    OrganizationDatabaseService,
    OrganizationAssemblerService,
  ],
  exports: [OrganizationDatabaseService, OrganizationAssemblerService],
})
export class OrganizationModule {}
