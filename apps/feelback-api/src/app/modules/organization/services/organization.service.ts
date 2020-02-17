import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrganizationEntity } from '../data/entities/organization.entity';
import { OrganizationObject } from '../ui/graphql/objects/organization.object';

@QueryService(OrganizationObject)
export class OrganizationService extends TypeOrmQueryService<
  OrganizationObject,
  OrganizationEntity
> {
  constructor(
    @InjectRepository(OrganizationEntity)
    repository: Repository<OrganizationEntity>
  ) {
    super(repository);
  }
}
