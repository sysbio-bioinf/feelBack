import { AssemblerQueryService, QueryService } from '@nestjs-query/core';
import { DoctorEntity } from '@feelback-app/api/data';
import { DoctorAssembler } from '../ui/graphql/assemblers/doctor.assembler';
import { DoctorObject } from '@feelback-app/api/interfaces';
import { DoctorDatabaseService } from './doctor-database.service';

@QueryService(DoctorObject)
export class DoctorAssemblerService extends AssemblerQueryService<
  DoctorObject,
  DoctorEntity
> {
  constructor(assembler: DoctorAssembler, service: DoctorDatabaseService) {
    super(assembler, service);
  }
}
