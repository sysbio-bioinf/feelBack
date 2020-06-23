import { FaqEntity } from '@cancerlog/api/data';
import { FaqObject } from '@cancerlog/api/interfaces';
import { AssemblerQueryService, QueryService } from '@nestjs-query/core';
import { FaqAssembler } from '../ui/graphql/assemblers/faq.assembler';
import { FaqDatabaseService } from './faq-database.service';

@QueryService(FaqObject)
export class FaqAssemblerService extends AssemblerQueryService<
  FaqObject,
  FaqEntity
> {
  constructor(assembler: FaqAssembler, service: FaqDatabaseService) {
    super(assembler, service);
  }
}
