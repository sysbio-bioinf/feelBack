import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InstrumentEntity } from '../data/entities/instrument.entity';
import { InstrumentObject } from '../ui/graphql/objects/instrument.object';

@QueryService(InstrumentObject)
export class InstrumentService extends TypeOrmQueryService<
  InstrumentObject,
  InstrumentEntity
> {
  constructor(
    @InjectRepository(InstrumentEntity) repository: Repository<InstrumentEntity>
  ) {
    super(repository);
  }
}
