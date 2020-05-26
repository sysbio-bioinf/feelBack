import {
  CreateFaqInput,
  FaqObject,
  UpdateFaqInput,
} from '@cancerlog/api/interfaces';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { Resolver } from '@nestjs/graphql';
import { FaqAssemblerService } from '../../../services/faq/faq-assembler.service';

@Resolver((of) => FaqObject)
export class FaqResolver extends CRUDResolver(FaqObject, {
  create: { many: { disabled: true }, CreateDTOClass: CreateFaqInput },
  update: { many: { disabled: true }, UpdateDTOClass: UpdateFaqInput },
  delete: { many: { disabled: true } },
}) {
  constructor(readonly service: FaqAssemblerService) {
    super(service);
  }
}
