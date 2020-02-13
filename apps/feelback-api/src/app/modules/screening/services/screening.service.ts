import { Injectable } from '@nestjs/common';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { ScreeningEntity } from '../data/entities/screening.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ScreeningService extends TypeOrmQueryService<ScreeningEntity> {
  constructor(
    @InjectRepository(ScreeningEntity) repository: Repository<ScreeningEntity>
  ) {
    super(repository);
  }
}
