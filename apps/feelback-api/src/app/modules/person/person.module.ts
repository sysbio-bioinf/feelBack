import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonEntity } from './data/entities/person.entity';
import { PersonAssemblerService } from './services/person/person-assembler.service';
import { PersonDatabaseService } from './services/person/person-database.service';
import { PersonAssembler } from './ui/graphql/assemblers/person.assembler';
import { PersonResolver } from './ui/graphql/resolvers/person.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([PersonEntity]), HttpModule],
  providers: [
    PersonResolver,
    PersonAssembler,
    PersonDatabaseService,
    PersonAssemblerService,
  ],
})
export class PersonModule {}
