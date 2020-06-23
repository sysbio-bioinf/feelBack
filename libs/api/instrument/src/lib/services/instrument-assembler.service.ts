import { InstrumentEntity } from '@cancerlog/api/data';
import { InstrumentObject } from '@cancerlog/api/interfaces';
import { AssemblerQueryService, QueryService } from '@nestjs-query/core';
import { InstrumentAssembler } from '../ui/graphql/assemblers/instrument.assembler';
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
