import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DoctorEntity } from '../../data/entities/doctor.entity';

@QueryService(DoctorEntity)
export class DoctorDatabaseService extends TypeOrmQueryService<DoctorEntity> {
  constructor(
    @InjectRepository(DoctorEntity) repository: Repository<DoctorEntity>,
  ) {
    super(repository);
  }
}
