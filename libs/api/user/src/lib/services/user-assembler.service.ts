import { DoctorEntity } from '@feelback-app/api/data';
import { UserObject } from '@feelback-app/api/interfaces';
import { AssemblerQueryService, QueryService } from '@nestjs-query/core';
import { UserDatabaseService } from './user-database.service';
import { UserAssembler } from '../ui/graphql/assemblers/user.assembler';

@QueryService(UserObject)
export class UserAssemblerService extends AssemblerQueryService<
  UserObject,
  DoctorEntity
> {
  constructor(
    public assembler: UserAssembler,
    public service: UserDatabaseService,
  ) {
    super(assembler, service);
  }

  async getUserByKeycloakId(keycloakId: string): Promise<UserObject> {
    const entity = this.service.getUserByKeycloakId(keycloakId);
    return this.assembler.convertAsyncToDTO(entity);
  }
}
