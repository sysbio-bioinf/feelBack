import { IdentityEntity } from '@cancerlog/api/data';
import { IDENTITY_DB_CONNECTION_NAME } from '@cancerlog/api/database';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdentityAssemblerService } from './services/identity/identity-assembler.service';
import { IdentityDatabaseService } from './services/identity/identity-database.service';
import { IdentityAssembler } from './ui/graphql/assemblers/identity.assembler';
import { IdentityResolver } from './ui/graphql/resolvers/identity.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([IdentityEntity], IDENTITY_DB_CONNECTION_NAME),
  ],
  providers: [
    IdentityResolver,
    IdentityAssembler,
    IdentityDatabaseService,
    IdentityAssemblerService,
  ],
  exports: [IdentityDatabaseService, IdentityAssemblerService],
})
export class IdentityModule {}
