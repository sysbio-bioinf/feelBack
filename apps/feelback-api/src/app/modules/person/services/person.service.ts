import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonEntity } from '../data/entities/person.entity';
import { PersonObject } from '../ui/graphql/objects/person.object';

@QueryService(PersonObject)
export class PersonService extends TypeOrmQueryService<
  PersonObject,
  PersonEntity
> {
  constructor(
    @InjectRepository(PersonEntity) repository: Repository<PersonEntity>,
  ) {
    super(repository);
  }
}
