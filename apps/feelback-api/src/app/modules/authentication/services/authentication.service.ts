import { KeycloakJwtModel } from '@cancerlog/api/auth';
import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DoctorEntity } from '@cancerlog/api/data';

@QueryService(DoctorEntity)
export class AuthenticationService extends TypeOrmQueryService<DoctorEntity> {
  constructor(
    @InjectRepository(DoctorEntity) repository: Repository<DoctorEntity>,
  ) {
    super(repository);
  }

  async findDoctorByKeycloakOrCreateNew(
    keycloak: KeycloakJwtModel,
  ): Promise<DoctorEntity> {
    // first check, if we have a doctor with this keycloak ID
    let account = await this.repo.findOne({
      where: { keycloakId: keycloak.sub },
    });

    if (!account) {
      // we do not have one, lets return
      account = await this.repo.save({ keycloakId: keycloak.sub });
    }

    return account;
  }
}
