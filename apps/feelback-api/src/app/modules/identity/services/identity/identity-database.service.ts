import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IDENTITY_DB_CONNECTION } from '../../../../constants/db.constants';
import { IdentityEntity } from '../../data/entities/identity.entity';

@QueryService(IdentityEntity)
export class IdentityDatabaseService extends TypeOrmQueryService<
  IdentityEntity
> {
  constructor(
    @InjectRepository(IdentityEntity, IDENTITY_DB_CONNECTION)
    repository: Repository<IdentityEntity>,
  ) {
    super(repository);
  }
}
