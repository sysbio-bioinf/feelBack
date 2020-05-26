import { startFSMFromState } from '@cancerlog/api/application';
import { CoreException } from '@cancerlog/api/core';
import { ScreeningEntity } from '@cancerlog/api/data';
import {
  CreateScreeningInput,
  EvaluationObject,
  GetScreeningsByPersonAndInstrumentArgsType,
  InstrumentObject,
  PersonObject,
  ResolveOneScreeningInputType,
  ScreeningConnection,
  ScreeningObject,
  UploadScreeningInputType,
  UserAgentObject,
} from '@cancerlog/api/interfaces';
import { DeepPartial, Query as QA } from '@nestjs-query/core';
import { ConnectionType, CRUDResolver } from '@nestjs-query/query-graphql';
import { HttpStatus } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {
  instrumentMachine,
  INSTRUMENT_MACHINE_STATES,
} from '../../../../instrument/machine/instrument.machine';
import { InstrumentAssemblerService } from '../../../../instrument/services/instrument/instrument-assembler.service';
import { PersonAssemblerService } from '../../../../person/services/person/person-assembler.service';
import { PersonDatabaseService } from '../../../../person/services/person/person-database.service';
import { EvaluationService } from '../../../services/evaluation/evaluation.service';
import { ScreeningAssemblerService } from '../../../services/screening/screening-assembler.service';
import { ScreeningDatabaseService } from '../../../services/screening/screening-database.service';

@Resolver((of) => ScreeningObject)
export class ScreeningResolver extends CRUDResolver(ScreeningObject, {
  read: { disabled: true },
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
  constructor(
    readonly service: ScreeningAssemblerService,
    readonly screeningDatabaseService: ScreeningDatabaseService,
    readonly instrumentService: InstrumentAssemblerService,
    readonly personService: PersonAssemblerService,
    readonly personDbService: PersonDatabaseService,
    private evaluationService: EvaluationService,
  ) {
    super(service);
  }

  @Mutation((returns) => ScreeningObject, { name: 'uploadScreening' })
  async uploadScreening(
    @Args('input') input: UploadScreeningInputType,
  ): Promise<ScreeningObject> {
    const instrument = await this.instrumentService.getById(input.instrumentId);

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

    // TODO: Maybe we can improve this,
    let person = {
      id: null,
    };
    if (input.personId) {
      person = await this.personService.getById(input.personId);
    }

    const screening = await this.service.createOne(input.input);
    await this.service.setRelation('instrument', screening.id, instrument.id);
    await this.service.setRelation('person', screening.id, person.id);

    return screening;
  }

  @Query((returns) => ScreeningConnection, {
    name: 'screeningsForPersonAndInstrument',
  })
  async getScreeningsForPersonAndInstrument(
    @Args() query: GetScreeningsByPersonAndInstrumentArgsType,
  ): Promise<ConnectionType<ScreeningObject>> {
    const qa: QA<ScreeningObject> = {
      paging: query.paging,
      sorting: query.sorting,
      // FIXME: This really (!) needs to be fixed; as this is very (!) ugly :(
      filter: {
        ...query.filter,
        ...{
          'person.id': { eq: query.personId },
          'instrument.id': { eq: query.instrumentId },
        },
      },
    };

    return ScreeningConnection.createFromPromise(
      (q) => this.service.query(q),
      qa,
    );
  }

  @Mutation((returns) => ScreeningObject, { name: 'resolveScreeningIssues' })
  async resolveScreeningIssues(
    @Args('input') input: ResolveOneScreeningInputType,
  ): Promise<ScreeningObject> {
    const dto: DeepPartial<ScreeningObject> = {
      isResolved: true,
      resolvedAt: input.update.resolvedAt,
      resolveComment: input.update.resolveComment,
    };

    return this.service.updateOne(input.id, dto);
  }

  @ResolveField('userAgent', (returns) => UserAgentObject, {
    description: 'UserAgent information',
    nullable: true,
  })
  resolveUserAgent(@Parent() parent: ScreeningEntity) {
    return parent.userAgent;
  }

  @ResolveField('evaluationResult', (returns) => [EvaluationObject], {
    description: 'Evaluation Results for this screening',
    nullable: true,
  })
  async resolveEvaluationResult(
    @Parent() screening: ScreeningObject,
  ): Promise<EvaluationObject[]> {
    const instrument = await this.service.findRelation(
      InstrumentObject,
      'instrument',
      screening,
    );

    if (!instrument) {
      return null;
    }

    const screeningEntity = await this.service.queryService.findById(
      screening.id,
    );
    const instrumentEntity = await this.instrumentService.queryService.findById(
      instrument.id,
    );

    const evaluationResults = await this.evaluationService.evaluate(
      screeningEntity,
      instrumentEntity,
    );

    const resultObject = evaluationResults.map((item) => {
      return {
        name: item.name,
        condition: item.condition,
        then: item.then,
        else: item.else,
        result: item.result,
      } as EvaluationObject;
    });

    return resultObject;
  }
}
