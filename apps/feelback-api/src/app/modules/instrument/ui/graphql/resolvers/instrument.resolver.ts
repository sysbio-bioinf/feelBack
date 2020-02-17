import { Resolver } from '@nestjs/graphql';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { InstrumentObject } from '../objects/instrument.object';
import { InstrumentService } from '../../../services/instrument.service';
import { CreateInstrumentInput } from '../inputs/create-instrument.input';
import { UpdateInstrumentInput } from '../inputs/update-instrument.input';
import { ScreeningObject } from '../../../../screening/ui/graphql/objects/screening.object';

@Resolver()
export class InstrumentResolver extends CRUDResolver(InstrumentObject, {
  create: { many: { disabled: true }, CreateDTOClass: CreateInstrumentInput },
  delete: { disabled: true },
  update: { many: { disabled: true }, UpdateDTOClass: UpdateInstrumentInput },
  relations: {
    many: {
      screenings: {
        relationName: 'screenings',
        DTO: ScreeningObject,
        nullable: true,
        disableRemove: true,
        disableUpdate: false
      }
    }
  }
}) {
  constructor(readonly service: InstrumentService) {
    super(service);
  }
}
