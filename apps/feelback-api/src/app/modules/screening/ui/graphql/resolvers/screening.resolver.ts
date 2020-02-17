import { Resolver } from '@nestjs/graphql';
import { ScreeningService } from '../../../services/screening.service';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { ScreeningObject } from '../objects/screening.object';
import { CreateScreeningInput } from '../inputs/create-screening.input';
import { InstrumentObject } from '../../../../instrument/ui/graphql/objects/instrument.object';

@Resolver()
export class ScreeningResolver extends CRUDResolver(ScreeningObject, {
  create: { many: { disabled: true }, CreateDTOClass: CreateScreeningInput },
  delete: { disabled: true },
  update: { disabled: true },
  relations: {
    one: {
      instrument: {
        relationName: 'instrument',
        DTO: InstrumentObject,
        nullable: true,
        disableRemove: true,
        disableUpdate: true
      }
    }
  }
}) {
  constructor(readonly service: ScreeningService) {
    super(service);
  }
}
