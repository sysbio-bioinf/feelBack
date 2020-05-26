import { Module } from '@nestjs/common';
import { IdentityResolver } from './ui/graphql/resolvers/identity.resolver';
import { IdentityDatabaseService } from './services/identity/identity-database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdentityEntity } from '@cancerlog/api/data';
import { IdentityAssemblerService } from './services/identity/identity-assembler.service';
import { IdentityAssembler } from './ui/graphql/assemblers/identity.assembler';
import { IDENTITY_DB_CONNECTION } from '../../constants/db.constants';

@Module({
  imports: [TypeOrmModule.forFeature([IdentityEntity], IDENTITY_DB_CONNECTION)],
  providers: [
    IdentityResolver,
    IdentityAssembler,
    IdentityDatabaseService,
    IdentityAssemblerService,
  ],
  exports: [IdentityDatabaseService, IdentityAssemblerService],
})
export class IdentityModule {}
