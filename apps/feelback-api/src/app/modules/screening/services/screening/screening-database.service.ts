import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScreeningEntity } from '@cancerlog/api/data';

@QueryService(ScreeningEntity)
export class ScreeningDatabaseService extends TypeOrmQueryService<
  ScreeningEntity
> {
  constructor(
    @InjectRepository(ScreeningEntity) repository: Repository<ScreeningEntity>,
  ) {
    super(repository);
  }
}
