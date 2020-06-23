import { InstrumentStatesEnum, ScreeningEntity } from '@cancerlog/api/data';
import {
  EC_GENERAL_NOTFOUND,
  ExceptionMessageModel,
} from '@cancerlog/api/errors';
import { InstrumentAssemblerService } from '@cancerlog/api/instrument';
import {
  CreateScreeningInput,
  DiagramDataObject,
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
import { ConflictException, NotFoundException } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PersonAssemblerService } from '../../../../person/services/person/person-assembler.service';
import { DiagramService } from '../../../services/diagram/diagram.service';
import { EvaluationService } from '../../../services/evaluation/evaluation.service';
import { ScreeningAssemblerService } from '../../../services/screening/screening-assembler.service';

@Resolver(() => ScreeningObject)
export class ScreeningResolver extends CRUDResolver(ScreeningObject, {
  read: { many: { disabled: true } },
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
  enableTotalCount: true,
}) {
  constructor(
    readonly service: ScreeningAssemblerService,
    readonly instrumentService: InstrumentAssemblerService,
    readonly personService: PersonAssemblerService,
    private evaluationService: EvaluationService,
    private diagramService: DiagramService,
  ) {
    super(service);
  }

  @Mutation((returns) => ScreeningObject, { name: 'uploadScreening' })
  async uploadScreening(
    @Args('input') input: UploadScreeningInputType,
  ): Promise<ScreeningObject> {
    const instrument = await this.instrumentService.queryService.getById(
      input.instrumentId,
    );

    if (instrument.state !== InstrumentStatesEnum.RELEASED) {
      throw new ConflictException({
        code: EC_GENERAL_NOTFOUND.code,
        title: 'Conflict',
        message: 'Invalid Resource State',
      } as ExceptionMessageModel);
    }

    const screening = await this.service.createOne(input.input);
    await this.service.setRelation('instrument', screening.id, instrument.id);

    if (input.personId) {
      const person = await this.personService.findById(input.personId);
      if (person) {
        await this.service.setRelation('person', screening.id, person.id);
      }
    }

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

  @Query((returns) => [DiagramDataObject], {
    name: 'screeningsDiagramCollections',
  })
  async getScreeningsDiagramCollections(
    @Args() query: GetScreeningsByPersonAndInstrumentArgsType,
  ): Promise<DiagramDataObject[]> {
    const instrument = await this.instrumentService.queryService.getById(
      query.instrumentId,
    );

    const collectionDiagrams = instrument.diagram.collection;

    const qa: QA<ScreeningObject> = {
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

    const screeningObjects = this.service.query(qa);
    const screeningEntities = await this.service.assembler.convertAsyncToEntities(
      screeningObjects,
    );

    const plotData = this.diagramService.createPlots(
      collectionDiagrams,
      screeningEntities,
    );

    return plotData;
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
      throw new NotFoundException({
        code: EC_GENERAL_NOTFOUND.code,
        title: 'Not Found',
        message: 'Instrument not found',
      } as ExceptionMessageModel);
    }

    const screeningEntity = await this.service.queryService.getById(
      screening.id,
    );
    const instrumentEntity = await this.instrumentService.queryService.getById(
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
