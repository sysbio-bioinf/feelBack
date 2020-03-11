import { Module } from '@nestjs/common';
import { IdentityResolver } from './ui/graphql/resolvers/identity.resolver';
import { IdentityDatabaseService } from './services/identity/identity-database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdentityEntity } from './data/entities/identity.entity';
import { IdentityAssemblerService } from './services/identity/identity-assembler.service';
import { IdentityAssembler } from './data/assemblers/identity.assembler';

@Module({
  imports: [TypeOrmModule.forFeature([IdentityEntity])],
  providers: [
    IdentityResolver,
    IdentityAssembler,
    IdentityDatabaseService,
    IdentityAssemblerService,
  ],
})
export class IdentityModule {}
