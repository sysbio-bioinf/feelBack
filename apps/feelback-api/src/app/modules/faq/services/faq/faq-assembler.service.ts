import { AssemblerQueryService, QueryService } from '@nestjs-query/core';
import { FaqEntity } from '@cancerlog/api/data';
import { FaqAssembler } from '../../ui/graphql/assemblers/faq.assembler';
import { FaqObject } from '../../ui/graphql/objects/faq.object';
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
