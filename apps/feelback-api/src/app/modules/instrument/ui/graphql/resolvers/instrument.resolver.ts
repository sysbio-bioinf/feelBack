import { CoreException } from '@cancerlog/api/core';
import {
  CopyOneInstrumentInputType,
  CreateOneInstrumentInputType,
  InstrumentObject,
  ReleaseOneInstrumentInputType,
  RetireOneInstrumentInputType,
  ScreeningObject,
  UpdateOneInstrumentInputType,
} from '@cancerlog/api/interfaces';
import {
  instrumentMachine,
  INSTRUMENT_MACHINE_EVENTS,
  INSTRUMENT_MACHINE_STATES,
  startFSMFromState,
} from '@cancerlog/api/state';
import { DeepPartial } from '@nestjs-query/core';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { HttpStatus } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { interpret } from 'xstate';
import { InstrumentAssemblerService } from '../../../services/instrument/instrument-assembler.service';

@Resolver(() => InstrumentObject)
export class InstrumentResolver extends CRUDResolver(InstrumentObject, {
  create: { disabled: true },
  delete: { disabled: true },
  update: { disabled: true },
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

  @Mutation((returns) => InstrumentObject, { name: 'createOneInstrument' })
  async createOneInstrument(
    @Args('input') input: CreateOneInstrumentInputType,
  ): Promise<InstrumentObject> {
    const instrumentFSM = interpret(instrumentMachine).start();
    const newState = instrumentFSM.state;

    const dto: DeepPartial<InstrumentObject> = {
      ...input.input,
      xState: JSON.stringify(newState),
    };

    const instrument = this.service.createOne(dto);

    return instrument;
  }

  @Mutation((returns) => InstrumentObject, { name: 'updateOneInstrument' })
  async updateOneInstrument(
    @Args('input') input: UpdateOneInstrumentInputType,
  ): Promise<InstrumentObject> {
    const instrument = await this.service.getById(input.id);
    const instrumentFSM = startFSMFromState(
      instrumentMachine,
      instrument.xState,
    );

    if (!instrumentFSM.state.matches(INSTRUMENT_MACHINE_STATES.DRAFT)) {
      throw new CoreException(
        {
          detail: 'Invalid Resource State',
          status: HttpStatus.CONFLICT,
        },
        HttpStatus.CONFLICT,
      );
    }

    const updatedInstrument = this.service.updateOne(
      instrument.id,
      input.update,
    );
    return updatedInstrument;
  }

  @Mutation((returns) => InstrumentObject, { name: 'releaseInstrument' })
  async releaseInstrument(
    @Args('input') input: ReleaseOneInstrumentInputType,
  ): Promise<InstrumentObject> {
    const instrument = await this.service.getById(input.id);
    const instrumentFSM = startFSMFromState(
      instrumentMachine,
      instrument.xState,
    );

    if (!instrumentFSM.state.matches(INSTRUMENT_MACHINE_STATES.DRAFT)) {
      throw new CoreException(
        {
          detail: 'Invalid Resource State',
          status: HttpStatus.CONFLICT,
        },
        HttpStatus.CONFLICT,
      );
    }

    instrumentFSM.send(INSTRUMENT_MACHINE_EVENTS.RELEASE);

    const updatedInstrument = this.service.updateOne(instrument.id, {
      xState: JSON.stringify(instrumentFSM.state),
    });

    return updatedInstrument;
  }

  @Mutation((returns) => InstrumentObject, { name: 'retireInstrument' })
  async retireInstrument(
    @Args('input') input: RetireOneInstrumentInputType,
  ): Promise<InstrumentObject> {
    const instrument = await this.service.getById(input.id);
    const instrumentFSM = startFSMFromState(
      instrumentMachine,
      instrument.xState,
    );

    if (!instrumentFSM.state.matches(INSTRUMENT_MACHINE_STATES.RELEASED)) {
      throw new CoreException(
        {
          detail: 'Invalid Resource State',
          status: HttpStatus.CONFLICT,
        },
        HttpStatus.CONFLICT,
      );
    }

    instrumentFSM.send(INSTRUMENT_MACHINE_EVENTS.RETIRE);

    const updatedInstrument = this.service.updateOne(instrument.id, {
      xState: JSON.stringify(instrumentFSM.state),
    });

    return updatedInstrument;
  }

  @Mutation((returns) => InstrumentObject, { name: 'copyInstrument' })
  async copyInstrument(
    @Args('input') input: CopyOneInstrumentInputType,
  ): Promise<InstrumentObject> {
    const instrument = await this.service.getById(input.id);

    const instrumentFSM = interpret(instrumentMachine).start();
    const newState = instrumentFSM.state;

    const newInstrumentDTO: DeepPartial<InstrumentObject> = {
      changelog: `initial version - copied from instrument ${instrument.name} (${instrument.id})`,
      name: `${instrument.name} (copy)`,
      description: instrument.description,
      type: instrument.type,
      image: instrument.image,
      payload: instrument.payload,
      rules: instrument.rules,
      diagram: instrument.diagram,
      xState: JSON.stringify(newState),
    };

    return this.service.createOne(newInstrumentDTO);
  }
}
