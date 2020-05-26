import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrganizationEntity } from '@cancerlog/api/data';

@QueryService(OrganizationEntity)
export class OrganizationDatabaseService extends TypeOrmQueryService<
  OrganizationEntity
> {
  constructor(
    @InjectRepository(OrganizationEntity)
    repository: Repository<OrganizationEntity>,
  ) {
    super(repository);
  }
}
