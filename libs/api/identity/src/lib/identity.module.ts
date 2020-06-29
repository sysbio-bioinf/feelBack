import { IdentityEntity } from '@feelback-app/api/data';
import { IDENTITY_DB_CONNECTION_NAME } from '@feelback-app/api/database';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdentityAssemblerService } from './services/identity-assembler.service';
import { IdentityDatabaseService } from './services/identity-database.service';
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
  exports: [
    IdentityDatabaseService,
    IdentityAssemblerService,
    IdentityAssembler,
  ],
})
export class IdentityModule {}
