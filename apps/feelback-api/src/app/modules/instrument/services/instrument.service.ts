import { Injectable } from '@nestjs/common';
import { InstrumentEntity } from '../data/entities/instrument.entity';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class InstrumentService extends TypeOrmQueryService<InstrumentEntity> {
  constructor(
    @InjectRepository(InstrumentEntity) repository: Repository<InstrumentEntity>
  ) {
    super(repository);
  }
}
