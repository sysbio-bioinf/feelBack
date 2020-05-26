import { AssemblerQueryService, QueryService } from '@nestjs-query/core';
import { PersonEntity } from '@cancerlog/api/data';
import { PersonAssembler } from '../../ui/graphql/assemblers/person.assembler';
import { PersonObject } from '../../ui/graphql/objects/person.object';
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
