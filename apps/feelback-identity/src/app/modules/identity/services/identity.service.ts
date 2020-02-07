import { Injectable } from '@nestjs/common';
import { IdentityEntity } from '../data/entities/identity.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';

@Injectable()
export class IdentityService extends TypeOrmQueryService<IdentityEntity> {
  constructor(
    @InjectRepository(IdentityEntity) repository: Repository<IdentityEntity>
  ) {
    super(repository);
  }
}
