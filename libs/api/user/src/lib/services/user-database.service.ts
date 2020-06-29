import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DoctorEntity } from '@feelback-app/api/data';

@QueryService(DoctorEntity)
export class UserDatabaseService extends TypeOrmQueryService<DoctorEntity> {
  constructor(
    @InjectRepository(DoctorEntity) repository: Repository<DoctorEntity>,
  ) {
    super(repository);
  }

  async getUserByKeycloakId(keycloakId: string): Promise<DoctorEntity> {
    return this.repo.findOneOrFail({ where: { keycloakId: keycloakId } });
  }
}
