import { CRUDResolver } from '@nestjs-query/query-graphql';
import { Resolver } from '@nestjs/graphql';
import { ScreeningObject } from '../../../../screening/ui/graphql/objects/screening.object';
import { InstrumentAssemblerService } from '../../../services/instrument/instrument-assembler.service';
import { CreateInstrumentInput } from '../inputs/create-instrument.input';
import { UpdateInstrumentInput } from '../inputs/update-instrument.input';
import { InstrumentObject } from '../objects/instrument.object';

@Resolver((of) => InstrumentObject)
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
        disableUpdate: true,
      },
    },
  },
}) {
  constructor(readonly service: InstrumentAssemblerService) {
    super(service);
  }
}
