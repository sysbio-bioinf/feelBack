import { PersonEntity } from '@cancerlog/api/data';
import { PersonObject } from '@cancerlog/api/interfaces';
import { AssemblerQueryService, QueryService } from '@nestjs-query/core';
import { PersonAssembler } from '../ui/graphql/assemblers/person.assembler';
import { PersonDatabaseService } from './person-database.service';

@QueryService(PersonObject)
export class PersonAssemblerService extends AssemblerQueryService<
  PersonObject,
  PersonEntity
> {
  constructor(assembler: PersonAssembler, service: PersonDatabaseService) {
    super(assembler, service);
  }
}
