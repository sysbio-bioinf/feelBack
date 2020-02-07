import { Injectable } from '@nestjs/common';
import { OrganizationEntity } from '../data/entities/organization.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';

@Injectable()
export class OrganizationService extends TypeOrmQueryService<
  OrganizationEntity
> {
  constructor(
    @InjectRepository(OrganizationEntity)
    repository: Repository<OrganizationEntity>
  ) {
    super(repository);
  }
}
