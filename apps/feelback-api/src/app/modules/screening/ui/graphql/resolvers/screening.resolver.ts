import {
  Resolver,
  Parent,
  ResolveProperty,
  Mutation,
  Args,
  Query,
} from '@nestjs/graphql';
import { ScreeningService } from '../../../services/screening.service';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { ScreeningObject } from '../objects/screening.object';
import { CreateScreeningInput } from '../inputs/create-screening.input';
import { InstrumentObject } from '../../../../instrument/ui/graphql/objects/instrument.object';
import { ScreeningEntity } from '../../../data/entities/screening.entity';
import { UserAgentObject } from '../objects/user-agent.object';
import { PersonObject } from '../../../../person/ui/graphql/objects/person.object';
import { ResolveOneScreeningInputType } from '../types/custom.types';
import { DeepPartial } from '@nestjs-query/core';
import * as deepmerge from 'deepmerge';
import { ParseUUIDPipe } from '@cancerlog/api/application';

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
        disableUpdate: false,
      },
      person: {
        relationName: 'person',
        DTO: PersonObject,
        nullable: true,
        disableRemove: true,
        disableUpdate: false,
      },
    },
  },
}) {
  constructor(readonly service: ScreeningService) {
    super(service);
  }

  @Query(returns => ScreeningObject, { name: 'evaluateScreening' })
  async evaluateScreening(
    @Args('id', new ParseUUIDPipe()) id: string,
  ): Promise<ScreeningObject> {
    // TODO: evaluate the screening

    return null;
  }

  @Mutation(returns => ScreeningObject, { name: 'resolveScreeningIssues' })
  async resolveScreeningIssues(
    @Args('input') input: ResolveOneScreeningInputType,
  ): Promise<ScreeningObject> {
    const dto: DeepPartial<ScreeningObject> = {
      isResolved: true,
      resolvedAt: new Date(),
    };
    const data = deepmerge(input.input, dto);

    return this.service.updateOne(input.id, data);
  }

  @ResolveProperty('userAgent', returns => UserAgentObject, {
    description: 'UserAgent information',
    nullable: true,
  })
  resolveUserAgent(@Parent() parent: ScreeningEntity) {
    return parent.userAgent;
  }
}
