import { DoctorEntity } from '@cancerlog/api/data';
import { UserObject } from '@cancerlog/api/interfaces';
import { AssemblerQueryService, QueryService } from '@nestjs-query/core';
import { UserAssembler } from '../../ui/graphql/assemblers/user.assembler';
import { DoctorDatabaseService } from '../doctor/doctor-database.service';

@QueryService(UserObject)
export class UserAssemblerService extends AssemblerQueryService<
  UserObject,
  DoctorEntity
> {
  constructor(assembler: UserAssembler, service: DoctorDatabaseService) {
    super(assembler, service);
  }
}
