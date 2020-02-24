import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScreeningEntity } from '../data/entities/screening.entity';
import { ScreeningObject } from '../ui/graphql/objects/screening.object';

@QueryService(ScreeningObject)
export class ScreeningService extends TypeOrmQueryService<
  ScreeningObject,
  ScreeningEntity
> {
  constructor(
    @InjectRepository(ScreeningEntity) repository: Repository<ScreeningEntity>,
  ) {
    super(repository);
  }
}
