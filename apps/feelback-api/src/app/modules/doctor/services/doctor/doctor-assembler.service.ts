import { AssemblerQueryService, QueryService } from '@nestjs-query/core';
import { DoctorEntity } from '@cancerlog/api/data';
import { DoctorAssembler } from '../../ui/graphql/assemblers/doctor.assembler';
import { DoctorObject } from '@cancerlog/api/interfaces';
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
