import { PersonEntity } from '@cancerlog/api/data';
import { IdentityModule } from '@cancerlog/api/identity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonAssemblerService } from './services/person-assembler.service';
import { PersonDatabaseService } from './services/person-database.service';
import { PersonAssembler } from './ui/graphql/assemblers/person.assembler';
import { PersonResolver } from './ui/graphql/resolvers/person.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([PersonEntity]), IdentityModule],
  providers: [
    PersonResolver,
    PersonAssembler,
    PersonDatabaseService,
    PersonAssemblerService,
  ],
  exports: [PersonDatabaseService, PersonAssemblerService, PersonAssembler],
})
export class PersonModule {}
