import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DoctorObject } from '../ui/graphql/objects/doctor.object';
import { DoctorEntity } from '../data/entities/doctor.entity';

@QueryService(DoctorObject)
export class DoctorService extends TypeOrmQueryService<
  DoctorObject,
  DoctorEntity
> {
  constructor(
    @InjectRepository(DoctorEntity) repository: Repository<DoctorEntity>,
  ) {
    super(repository);
  }
}
