import { ScreeningEntity } from '@feelback-app/api/data';
import { ScreeningObject } from '@feelback-app/api/interfaces';
import { AssemblerQueryService, QueryService } from '@nestjs-query/core';
import { ScreeningAssembler } from '../ui/graphql/assemblers/screening.assembler';
import { ScreeningDatabaseService } from './screening-database.service';

@QueryService(ScreeningObject)
export class ScreeningAssemblerService extends AssemblerQueryService<
  ScreeningObject,
  ScreeningEntity
> {
  constructor(
    assembler: ScreeningAssembler,
    service: ScreeningDatabaseService,
  ) {
    super(assembler, service);
  }
}
