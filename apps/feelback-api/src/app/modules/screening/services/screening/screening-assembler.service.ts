import { AssemblerQueryService, QueryService } from '@nestjs-query/core';
import { ScreeningEntity } from '../../data/entities/screening.entity';
import { ScreeningAssembler } from '../../ui/graphql/assemblers/screening.assembler';
import { ScreeningObject } from '../../ui/graphql/objects/screening.object';
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
