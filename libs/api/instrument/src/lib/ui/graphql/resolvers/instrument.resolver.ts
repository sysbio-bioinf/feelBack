import {
  EC_GENERAL_CONFLICT,
  ExceptionMessageModel,
} from '@cancerlog/api/errors';
import {
  CopyOneInstrumentInputType,
  CreateOneInstrumentInputType,
  InstrumentObject,
  ReleaseOneInstrumentInputType,
  RetireOneInstrumentInputType,
  ScreeningObject,
  UpdateOneInstrumentInputType,
} from '@cancerlog/api/interfaces';
import { DeepPartial } from '@nestjs-query/core';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { ConflictException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { InstrumentStatesEnum } from '@cancerlog/api/data';
import { InstrumentAssemblerService } from '../../../services/instrument-assembler.service';
import {
  Unprotected,
  GqlMasterGuard,
  Roles,
  RolesEnum,
} from '@cancerlog/api/auth';

@Resolver(() => InstrumentObject)
export class InstrumentResolver extends CRUDResolver(InstrumentObject, {
  read: {
    decorators: [Unprotected()],
    guards: [GqlMasterGuard],
  },
  create: { disabled: true },
  update: { disabled: true },
  delete: { disabled: true },
  relations: {
    many: {
      screenings: {
        relationName: 'screenings',
        DTO: ScreeningObject,
        nullable: true,
        disableRemove: true,
        disableUpdate: true,
        decorators: [Roles(RolesEnum.MANAGER)],
        guards: [GqlMasterGuard],
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
  @UseGuards(GqlMasterGuard)
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
  @UseGuards(GqlMasterGuard)
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
  @UseGuards(GqlMasterGuard)
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
  @UseGuards(GqlMasterGuard)
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
  @UseGuards(GqlMasterGuard)
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
