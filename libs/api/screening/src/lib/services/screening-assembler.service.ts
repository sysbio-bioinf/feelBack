import { ScreeningEntity } from '@cancerlog/api/data';
import { ScreeningObject } from '@cancerlog/api/interfaces';
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
