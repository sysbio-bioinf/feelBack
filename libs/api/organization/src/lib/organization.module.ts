import { OrganizationEntity } from '@feelback-app/api/data';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationAssemblerService } from './services/organization-assembler.service';
import { OrganizationDatabaseService } from './services/organization-database.service';
import { OrganizationAssembler } from './ui/graphql/assemblers/organization.assembler';
import { OrganizationResolver } from './ui/graphql/resolvers/organization.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([OrganizationEntity])],
  providers: [
    OrganizationResolver,
    OrganizationAssembler,
    OrganizationDatabaseService,
    OrganizationAssemblerService,
  ],
  exports: [
    OrganizationDatabaseService,
    OrganizationAssemblerService,
    OrganizationAssembler,
  ],
})
export class OrganizationModule {}
