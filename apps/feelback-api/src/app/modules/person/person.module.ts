import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonEntity } from '@cancerlog/api/data';
import { PersonAssemblerService } from './services/person/person-assembler.service';
import { PersonDatabaseService } from './services/person/person-database.service';
import { PersonAssembler } from './ui/graphql/assemblers/person.assembler';
import { PersonResolver } from './ui/graphql/resolvers/person.resolver';
import { IdentityModule } from '../identity/identity.module';

@Module({
  imports: [TypeOrmModule.forFeature([PersonEntity]), IdentityModule],
  providers: [
    PersonResolver,
    PersonAssembler,
    PersonDatabaseService,
    PersonAssemblerService,
  ],
  exports: [PersonDatabaseService, PersonAssemblerService],
})
export class PersonModule {}
