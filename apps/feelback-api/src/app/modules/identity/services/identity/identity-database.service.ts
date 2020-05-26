import { IdentityEntity } from '@cancerlog/api/data';
import { IDENTITY_DB_CONNECTION_NAME } from '@cancerlog/api/database';
import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@QueryService(IdentityEntity)
export class IdentityDatabaseService extends TypeOrmQueryService<
  IdentityEntity
> {
  constructor(
    @InjectRepository(IdentityEntity, IDENTITY_DB_CONNECTION_NAME)
    repository: Repository<IdentityEntity>,
  ) {
    super(repository);
  }
}
