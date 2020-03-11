import { Module } from '@nestjs/common';
import { IdentityResolver } from './ui/graphql/resolvers/identity.resolver';
import { IdentityService } from './services/identity/identity.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdentityEntity } from './data/entities/identity.entity';
import { IdentityAssemblerService } from './services/identity-assembler/identity-assembler.service';
import { IdentityAssembler } from './data/assemblers/identity.assembler';

@Module({
  imports: [TypeOrmModule.forFeature([IdentityEntity])],
  providers: [
    IdentityResolver,
    IdentityAssembler,
    IdentityService,
    IdentityAssemblerService,
  ],
})
export class IdentityModule {}
