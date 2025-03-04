import { Roles, Unprotected } from '@feelback-app/api/auth';
import { InstrumentStatesEnum } from '@feelback-app/api/data';
import { InvalidStateApiException } from '@feelback-app/api/errors';
import {
  CopyOneInstrumentInputType,
  CreateOneInstrumentInputType,
  InstrumentObject,
  ReleaseOneInstrumentInputType,
  RetireOneInstrumentInputType,
  UpdateOneInstrumentInputType,
  DeleteOneInstrumentInputType,
} from '@feelback-app/api/interfaces';
import { RolesEnum } from '@feelback-app/api/shared';
import { DeepPartial } from '@nestjs-query/core';
import { CRUDResolver } from '@nestjs-query/query-graphql';
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
      throw new InvalidStateApiException();
    }

    const updatedInstrument = this.service.updateOne(
      instrument.id,
      input.update,
    );
    return updatedInstrument;
  }

  @Mutation((returns) => Boolean, { name: 'deleteOneInstrument' })
  @Roles(RolesEnum.ADMIN)
  async deleteOneInstrument(
    @Args('input') input: DeleteOneInstrumentInputType,
  ): Promise<boolean> {
    const instrument = await this.service.queryService.getById(input.id);

    let canBeDeleted = false;
    if (instrument.state === InstrumentStatesEnum.DRAFT) {
      canBeDeleted = true;
    }

    if (instrument.state === InstrumentStatesEnum.RETIRED) {
      canBeDeleted = true;
    }

    if (canBeDeleted === false) {
      throw new InvalidStateApiException();
    }
    await this.service.deleteOne(input.id);

    return true;
  }

  @Mutation((returns) => InstrumentObject, { name: 'releaseInstrument' })
  @Roles(RolesEnum.ADMIN)
  async releaseInstrument(
    @Args('input') input: ReleaseOneInstrumentInputType,
  ): Promise<InstrumentObject> {
    const instrument = await this.service.queryService.getById(input.id);

    if (instrument.state !== InstrumentStatesEnum.DRAFT) {
      throw new InvalidStateApiException();
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
      throw new InvalidStateApiException();
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
