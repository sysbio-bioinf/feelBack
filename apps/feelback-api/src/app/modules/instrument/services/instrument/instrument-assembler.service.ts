import { AssemblerQueryService, QueryService } from '@nestjs-query/core';
import { InstrumentEntity } from '../../data/entities/instrument.entity';
import { InstrumentAssembler } from '../../ui/graphql/assemblers/instrument.assembler';
import { InstrumentObject } from '../../ui/graphql/objects/instrument.object';
import { InstrumentDatabaseService } from './instrument-database.service';

@QueryService(InstrumentObject)
export class InstrumentAssemblerService extends AssemblerQueryService<
  InstrumentObject,
  InstrumentEntity
> {
  constructor(
    assembler: InstrumentAssembler,
    service: InstrumentDatabaseService,
  ) {
    super(assembler, service);
  }
}
