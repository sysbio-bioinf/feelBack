import { Module } from '@nestjs/common';
import { IdentityResolver } from './ui/graphql/resolvers/identity.resolver';
import { IdentityService } from './services/identity.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdentityEntity } from './data/entities/identity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IdentityEntity])],
  providers: [IdentityResolver, IdentityService],
})
export class IdentityModule {}
