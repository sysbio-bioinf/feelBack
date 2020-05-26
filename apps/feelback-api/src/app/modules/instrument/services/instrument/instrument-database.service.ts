import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InstrumentEntity } from '@cancerlog/api/data';

@QueryService(InstrumentEntity)
export class InstrumentDatabaseService extends TypeOrmQueryService<
  InstrumentEntity
> {
  constructor(
    @InjectRepository(InstrumentEntity)
    repository: Repository<InstrumentEntity>,
  ) {
    super(repository);
  }
}
