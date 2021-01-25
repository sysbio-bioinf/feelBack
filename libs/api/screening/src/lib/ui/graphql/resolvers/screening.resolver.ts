import { Roles, Unprotected } from '@feelback-app/api/auth';
import { InstrumentStatesEnum, ScreeningEntity } from '@feelback-app/api/data';
import {
  InvalidStateApiException,
  NotFoundApiException,
} from '@feelback-app/api/errors';
import { InstrumentAssemblerService } from '@feelback-app/api/instrument';
import {
  CreateScreeningInput,
  DiagramDataObject,
  EvaluationObject,
  GetScreeningsByPersonAndInstrumentArgsType,
  InstrumentObject,
  ResolveOneScreeningInputType,
  ScreeningConnection,
  ScreeningObject,
  UploadScreeningInputType,
  UserAgentObject,
} from '@feelback-app/api/interfaces';
import { PersonAssemblerService } from '@feelback-app/api/person';
import { RolesEnum } from '@feelback-app/api/shared';
import { DeepPartial, Query as QA } from '@nestjs-query/core';
import { ConnectionType, CRUDResolver } from '@nestjs-query/query-graphql';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { DiagramService } from '../../../services/diagram.service';
import { EvaluationService } from '../../../services/evaluation.service';
import { ScreeningAssemblerService } from '../../../services/screening-assembler.service';

@Resolver(() => ScreeningObject)
export class ScreeningResolver extends CRUDResolver(ScreeningObject, {
  read: {
    many: { disabled: true },
    one: {
      decorators: [Unprotected()],
    },
  },
  create: {
    many: { disabled: true },
    one: {
      decorators: [Unprotected()],
    },
    CreateDTOClass: CreateScreeningInput,
  },
  delete: { disabled: true },
  update: { disabled: true },
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
  @Unprotected()
  async uploadScreening(
    @Args('input') input: UploadScreeningInputType,
  ): Promise<ScreeningObject> {
    const instrument = await this.instrumentService.queryService.getById(
      input.instrumentId,
    );

    if (instrument.state !== InstrumentStatesEnum.RELEASED) {
      throw new InvalidStateApiException();
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
  @Unprotected()
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

    return ScreeningConnection.createFromPromise(this.service.query, qa);
  }

  @Query((returns) => [DiagramDataObject], {
    name: 'screeningsDiagramCollections',
  })
  @Unprotected()
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
  @Roles(RolesEnum.MANAGER)
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
  @Roles(RolesEnum.MANAGER)
  async resolveEvaluationResult(
    @Parent() screening: ScreeningObject,
  ): Promise<EvaluationObject[]> {
    const instrument = await this.service.findRelation(
      InstrumentObject,
      'instrument',
      screening,
    );

    if (!instrument) {
      throw new NotFoundApiException();
    }

    const screeningEntity = await this.service.queryService.getById(
      screening.id,
    );
    const instrumentEntity = await this.instrumentService.queryService.getById(
      instrument.id,
    );

    const evaluationResults = this.evaluationService.evaluate(
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
