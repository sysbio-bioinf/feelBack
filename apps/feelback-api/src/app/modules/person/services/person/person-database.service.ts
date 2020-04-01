import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonEntity } from '../../data/entities/person.entity';

@QueryService(PersonEntity)
export class PersonDatabaseService extends TypeOrmQueryService<PersonEntity> {
  constructor(
    @InjectRepository(PersonEntity) repository: Repository<PersonEntity>,
  ) {
    super(repository);
  }

  async getPersonByPseudonym(pseudonym: string): Promise<PersonEntity> {
    const person = await this.repo.findOne({
      where: {
        pseudonym: pseudonym,
      },
    });

    return person;
  }
}
