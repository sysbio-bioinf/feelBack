import { Resolver } from '@nestjs/graphql';
import { ScreeningService } from '../../../services/screening.service';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { ScreeningObject } from '../objects/screening.object';
import { CreateScreeningInput } from '../inputs/create-screening.input';

@Resolver()
export class ScreeningResolver extends CRUDResolver(ScreeningObject, {
  create: { many: { disabled: true }, CreateDTOClass: CreateScreeningInput },
  delete: { disabled: true },
  update: { disabled: true }
}) {
  constructor(readonly service: ScreeningService) {
    super(service);
  }
}
