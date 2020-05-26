import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FaqEntity } from '@cancerlog/api/data';

@QueryService(FaqEntity)
export class FaqDatabaseService extends TypeOrmQueryService<FaqEntity> {
  constructor(@InjectRepository(FaqEntity) repository: Repository<FaqEntity>) {
    super(repository);
  }
}
