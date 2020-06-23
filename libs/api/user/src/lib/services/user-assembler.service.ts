import { DoctorEntity } from '@cancerlog/api/data';
import { UserObject } from '@cancerlog/api/interfaces';
import { AssemblerQueryService, QueryService } from '@nestjs-query/core';
import { UserDatabaseService } from './user-database.service';
import { UserAssembler } from '../ui/graphql/assemblers/user.assembler';

@QueryService(UserObject)
export class UserAssemblerService extends AssemblerQueryService<
  UserObject,
  DoctorEntity
> {
  constructor(assembler: UserAssembler, service: UserDatabaseService) {
    super(assembler, service);
  }
}
