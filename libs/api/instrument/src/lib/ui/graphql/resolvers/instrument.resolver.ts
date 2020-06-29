import { Roles, Unprotected } from '@feelback-app/api/auth';
import { InstrumentStatesEnum } from '@feelback-app/api/data';
import {
  EC_GENERAL_CONFLICT,
  ExceptionMessageModel,
} from '@feelback-app/api/errors';
import {
  CopyOneInstrumentInputType,
  CreateOneInstrumentInputType,
  InstrumentObject,
  ReleaseOneInstrumentInputType,
  RetireOneInstrumentInputType,
  ScreeningObject,
  UpdateOneInstrumentInputType,
} from '@feelback-app/api/interfaces';
import { RolesEnum } from '@feelback-app/api/shared';
import { DeepPartial } from '@nestjs-query/core';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { ConflictException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { InstrumentAssemblerService } from '../../../services/instrument-assembler.service';

@Resolver(() => InstrumentObject)
export class InstrumentResolver extends CRUDResolver(InstrumentObject, {
  read: {
    decorators: [Unprotected()],
  },
  create: { disabled: true },
  update: { disabled: true },
  delete: { disabled: true },
  relations: {
    many: {
      // FIXME: this should only be accessible with a certain role!
      screenings: {
        relationName: 'screenings',
        DTO: ScreeningObject,
        nullable: true,
        disableRemove: true,
        disableUpdate: true,
        decorators: [Roles(RolesEnum.MANAGER)],
      },
    },
  },
  enableTotalCount: true,
}) {
  constructor(readonly service: InstrumentAssemblerService) {
    super(service);
  }

  @Mutation((returns) => InstrumentObject, { name: 'createOneInstrument' })
  @Roles(RolesEnum.ADMIN)
  async createOneInstrument(
    @Args('input') input: CreateOneInstrumentInputType,
  ): Promise<InstrumentObject> {
    const dto: DeepPartial<InstrumentObject> = {
      ...input.input,
      state: InstrumentStatesEnum.DRAFT,
    };

    const instrument = this.service.createOne(dto);

    return instrument;
  }

  @Mutation((returns) => InstrumentObject, { name: 'updateOneInstrument' })
  @Roles(RolesEnum.ADMIN)
  async updateOneInstrument(
    @Args('input') input: UpdateOneInstrumentInputType,
  ): Promise<InstrumentObject> {
    const instrument = await this.service.queryService.getById(input.id);

    if (instrument.state !== InstrumentStatesEnum.DRAFT) {
      throw new ConflictException({
        code: EC_GENERAL_CONFLICT.code,
        title: 'Conflict',
        message: 'Invalid Resource State',
      } as ExceptionMessageModel);
    }

    const updatedInstrument = this.service.updateOne(
      instrument.id,
      input.update,
    );
    return updatedInstrument;
  }

  @Mutation((returns) => InstrumentObject, { name: 'releaseInstrument' })
  @Roles(RolesEnum.ADMIN)
  async releaseInstrument(
    @Args('input') input: ReleaseOneInstrumentInputType,
  ): Promise<InstrumentObject> {
    const instrument = await this.service.queryService.getById(input.id);

    if (instrument.state !== InstrumentStatesEnum.DRAFT) {
      throw new ConflictException({
        code: EC_GENERAL_CONFLICT.code,
        title: 'Conflict',
        message: 'Invalid Resource State',
      } as ExceptionMessageModel);
    }

    const updatedInstrument = this.service.updateOne(instrument.id, {
      state: InstrumentStatesEnum.RELEASED,
    });

    return updatedInstrument;
  }

  @Mutation((returns) => InstrumentObject, { name: 'retireInstrument' })
  @Roles(RolesEnum.ADMIN)
  async retireInstrument(
    @Args('input') input: RetireOneInstrumentInputType,
  ): Promise<InstrumentObject> {
    const instrument = await this.service.queryService.getById(input.id);

    if (instrument.state !== InstrumentStatesEnum.RELEASED) {
      throw new ConflictException({
        code: EC_GENERAL_CONFLICT.code,
        title: 'Conflict',
        message: 'Invalid Resource State',
      } as ExceptionMessageModel);
    }

    const updatedInstrument = this.service.updateOne(instrument.id, {
      state: InstrumentStatesEnum.RETIRED,
    });

    return updatedInstrument;
  }

  @Mutation((returns) => InstrumentObject, { name: 'copyInstrument' })
  @Roles(RolesEnum.ADMIN)
  async copyInstrument(
    @Args('input') input: CopyOneInstrumentInputType,
  ): Promise<InstrumentObject> {
    const instrument = await this.service.getById(input.id);

    const newInstrumentDTO: DeepPartial<InstrumentObject> = {
      changelog: `initial version - copied from instrument ${instrument.name} (${instrument.id})`,
      name: `${instrument.name} (copy)`,
      description: instrument.description,
      type: instrument.type,
      image: instrument.image,
      payload: instrument.payload,
      rules: instrument.rules,
      diagram: instrument.diagram,
      state: InstrumentStatesEnum.DRAFT,
    };

    return this.service.createOne(newInstrumentDTO);
  }
}
