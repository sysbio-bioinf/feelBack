import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IdentityEntity } from '../data/entities/identity.entity';
import { IdentityObject } from '../ui/graphql/objects/identity.object';

@QueryService(IdentityObject)
export class IdentityService extends TypeOrmQueryService<
  IdentityObject,
  IdentityEntity
> {
  constructor(
    @InjectRepository(IdentityEntity) repository: Repository<IdentityEntity>
  ) {
    super(repository);
  }
}
