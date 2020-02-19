import { Resolver, Parent, ResolveProperty } from '@nestjs/graphql';
import { ScreeningService } from '../../../services/screening.service';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { ScreeningObject } from '../objects/screening.object';
import { CreateScreeningInput } from '../inputs/create-screening.input';
import { InstrumentObject } from '../../../../instrument/ui/graphql/objects/instrument.object';
import { ScreeningEntity } from '../../../data/entities/screening.entity';
import { UserAgentObject } from '../objects/user-agent.object';
import { PersonObject } from '../../../../person/ui/graphql/objects/person.object';

@Resolver(of => ScreeningObject)
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
        disableUpdate: false
      },
      person: {
        relationName: 'person',
        DTO: PersonObject,
        nullable: true,
        disableRemove: true,
        disableUpdate: false
      }
    }
  }
}) {
  constructor(readonly service: ScreeningService) {
    super(service);
  }

  @ResolveProperty('userAgent', returns => UserAgentObject, {
    description: 'UserAgent information',
    nullable: true
  })
  resolveUserAgent(@Parent() parent: ScreeningEntity) {
    return parent.userAgent;
  }
}
