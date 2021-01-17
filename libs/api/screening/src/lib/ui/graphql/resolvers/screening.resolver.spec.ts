import { GuardsModule } from '@feelback-app/api/auth';
import {
  DiagramPlotClass,
  DiagramPlotDataClass,
  EvaluationClass,
  InstrumentEntity,
  InstrumentStatesEnum,
  PersonEntity,
  ScreeningEntity,
  UserAgentClass,
} from '@feelback-app/api/data';
import {
  InvalidStateApiException,
  NotFoundApiException,
} from '@feelback-app/api/errors';
import {
  InstrumentAssembler,
  InstrumentAssemblerService,
  InstrumentDatabaseService,
} from '@feelback-app/api/instrument';
import {
  EvaluationObject,
  GetScreeningsByPersonAndInstrumentArgsType,
  InstrumentObject,
  PersonObject,
  ResolveOneScreeningInputType,
  ScreeningConnection,
  ScreeningObject,
  UploadScreeningInputType,
} from '@feelback-app/api/interfaces';
import {
  PersonAssembler,
  PersonAssemblerService,
  PersonDatabaseService,
} from '@feelback-app/api/person';
import {
  emptyScreeningObject,
  generateInstrumentEntity,
  generateInstrumentObject,
  generateScreeningEntity,
  generateScreeningObject,
  mockRepository,
} from '@feelback-app/api/testing';
import { Query } from '@nestjs-query/core';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DiagramService } from '../../../services/diagram.service';
import { EvaluationService } from '../../../services/evaluation.service';
import { ScreeningAssemblerService } from '../../../services/screening-assembler.service';
import { ScreeningDatabaseService } from '../../../services/screening-database.service';
import { ScreeningAssembler } from '../assemblers/screening.assembler';
import { ScreeningResolver } from './screening.resolver';

// Constants used for id
const draftState = 'draft';
const retiredState = 'retired';
const releasedState = 'released';

// Mocks for ScreeningAssemblerService
const mockScreeningServiceCreateOne = jest.fn();
const mockScreeningServiceSetRelation = jest.fn();
const mockScreeningServiceQuery = jest.fn();
const mockScreeningServiceAssemblerConvertAsyncToEntities = jest.fn();
const mockScreeningServiceUpdateOne = jest.fn();
const mockScreeningServiceFindRelation = jest.fn();
const mockScreeningServiceQueryGetById = jest.fn();
// Mocks for InstrumentAssemblerService
const mockInstrumentServiceQueryGetById = jest.fn();
// Mocks for PersonAssemblerService
const mockPersonServiceFindById = jest.fn();
// Mocks for EvaluationService
const mockEvaluationServiceEvaluate = jest.fn();
// Mocks for DiagramService
const mockDiagramServiceCreatePlots = jest.fn();

describe('ScreeningResolver', () => {
  let resolver: ScreeningResolver;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      imports: [GuardsModule],
      providers: [
        ScreeningResolver,
        ScreeningAssembler,
        ScreeningAssemblerService,
        ScreeningDatabaseService,
        EvaluationService,
        DiagramService,
        InstrumentAssemblerService,
        InstrumentDatabaseService,
        InstrumentAssembler,
        PersonAssemblerService,
        PersonDatabaseService,
        PersonAssembler,
        {
          provide: getRepositoryToken(ScreeningEntity),
          useClass: mockRepository,
        },
        {
          provide: getRepositoryToken(InstrumentEntity),
          useClass: mockRepository,
        },
        {
          provide: getRepositoryToken(PersonEntity),
          useClass: mockRepository,
        },
      ],
    }).compile();

    resolver = module.get<ScreeningResolver>(ScreeningResolver);

    // Set mocks for ScreeningAssemblerService
    const screeningAssemblerServicve = module.get<ScreeningAssemblerService>(
      ScreeningAssemblerService,
    );
    screeningAssemblerServicve.createOne = mockScreeningServiceCreateOne;
    screeningAssemblerServicve.setRelation = mockScreeningServiceSetRelation;
    screeningAssemblerServicve.query = mockScreeningServiceQuery;
    screeningAssemblerServicve.assembler.convertAsyncToEntities = mockScreeningServiceAssemblerConvertAsyncToEntities;
    screeningAssemblerServicve.updateOne = mockScreeningServiceUpdateOne;
    screeningAssemblerServicve.findRelation = mockScreeningServiceFindRelation;
    screeningAssemblerServicve.queryService.getById = mockScreeningServiceQueryGetById;
    // Set mocks for InstrumentAssemblerService
    const instrumentAssemblerService = module.get<InstrumentAssemblerService>(
      InstrumentAssemblerService,
    );
    instrumentAssemblerService.queryService.getById = mockInstrumentServiceQueryGetById;
    // Set mocks for PersonAssemblerService
    const personAssemblerService = module.get<PersonAssemblerService>(
      PersonAssemblerService,
    );
    personAssemblerService.findById = mockPersonServiceFindById;
    // Set mocks for EvaluationService
    const evaluationService = module.get<EvaluationService>(EvaluationService);
    evaluationService.evaluate = mockEvaluationServiceEvaluate;
    // Set mocks for DiagramService
    const diagramService = module.get<DiagramService>(DiagramService);
    diagramService.createPlots = mockDiagramServiceCreatePlots;
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  const draftInstrumentEntity = generateInstrumentEntity({
    state: InstrumentStatesEnum.DRAFT,
  });
  const retiredInstrumentEntity = generateInstrumentEntity({
    state: InstrumentStatesEnum.RETIRED,
  });
  const releasedInstrumentEntity = generateInstrumentEntity({
    state: InstrumentStatesEnum.RELEASED,
  });

  const personObject: PersonObject = {
    id: 'personId',
    pseudonym: 'pseudonym',
    acceptedTOS: true,
    version: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  describe('uploadScreening', () => {
    const generateUploadInput = (
      instrumentId: string,
      personId?: string,
    ): UploadScreeningInputType => ({
      instrumentId: instrumentId,
      personId: personId || '',
      input: {
        instanceId: 'instanceId',
        collectedAt: new Date(),
        payload: {},
        language: 'de',
      },
    });

    it('should throw error if state is draft', async () => {
      mockInstrumentServiceQueryGetById.mockResolvedValueOnce(
        draftInstrumentEntity,
      );
      const invalidInput = generateUploadInput(draftState);
      expect.assertions(3);
      try {
        await resolver.uploadScreening(invalidInput);
        fail();
      } catch (error) {
        expect(error).toBeInstanceOf(InvalidStateApiException);
      }
      expect(mockInstrumentServiceQueryGetById).toBeCalledTimes(1);
      expect(mockInstrumentServiceQueryGetById).toBeCalledWith(
        invalidInput.instrumentId,
      );
    });

    it('should throw error if state is retired', async () => {
      mockInstrumentServiceQueryGetById.mockResolvedValueOnce(
        retiredInstrumentEntity,
      );
      const invalidInput = generateUploadInput(retiredState);
      expect.assertions(3);
      try {
        await resolver.uploadScreening(invalidInput);
        fail();
      } catch (error) {
        expect(error).toBeInstanceOf(InvalidStateApiException);
      }
      expect(mockInstrumentServiceQueryGetById).toBeCalledTimes(1);
      expect(mockInstrumentServiceQueryGetById).toBeCalledWith(
        invalidInput.instrumentId,
      );
    });

    const relationIdInstrument = 'instrument';
    const relationIdPerson = 'person';

    it('should return screening object if personId is empty', async () => {
      const input = generateUploadInput(releasedState, '');
      const expected = generateScreeningObject(input.input);
      mockInstrumentServiceQueryGetById.mockResolvedValueOnce(
        releasedInstrumentEntity,
      );
      mockScreeningServiceCreateOne.mockResolvedValueOnce(expected);
      const result = await resolver.uploadScreening(input);
      expect(result).toStrictEqual(expected);
      expect(mockInstrumentServiceQueryGetById).toBeCalledTimes(1);
      expect(mockInstrumentServiceQueryGetById).toBeCalledWith(
        input.instrumentId,
      );
      expect(mockScreeningServiceCreateOne).toBeCalledTimes(1);
      expect(mockScreeningServiceCreateOne).toBeCalledWith(input.input);
      expect(mockScreeningServiceSetRelation).toBeCalledTimes(1);
      expect(mockScreeningServiceSetRelation).toBeCalledWith(
        relationIdInstrument,
        expected.id,
        releasedInstrumentEntity.id,
      );
    });

    it("should return screening object if person isn't found", async () => {
      const input = generateUploadInput(releasedState, 'person not found');
      const expected = generateScreeningObject(input.input);
      mockInstrumentServiceQueryGetById.mockResolvedValueOnce(
        releasedInstrumentEntity,
      );
      mockScreeningServiceCreateOne.mockResolvedValueOnce(expected);
      mockPersonServiceFindById.mockResolvedValueOnce(undefined);
      const result = await resolver.uploadScreening(input);
      expect(result).toStrictEqual(expected);
      expect(mockInstrumentServiceQueryGetById).toBeCalledTimes(1);
      expect(mockInstrumentServiceQueryGetById).toBeCalledWith(
        input.instrumentId,
      );
      expect(mockScreeningServiceCreateOne).toBeCalledTimes(1);
      expect(mockScreeningServiceCreateOne).toBeCalledWith(input.input);
      expect(mockScreeningServiceSetRelation).toBeCalledTimes(1);
      expect(mockScreeningServiceSetRelation).toBeCalledWith(
        relationIdInstrument,
        expected.id,
        releasedInstrumentEntity.id,
      );
      expect(mockPersonServiceFindById).toBeCalledTimes(1);
      expect(mockPersonServiceFindById).toBeCalledWith(input.personId);
    });

    it('should return screening object', async () => {
      const input = generateUploadInput(releasedState, 'success!');
      const expected = generateScreeningObject(input.input);
      mockInstrumentServiceQueryGetById.mockResolvedValueOnce(
        releasedInstrumentEntity,
      );
      mockScreeningServiceCreateOne.mockResolvedValueOnce(expected);
      mockPersonServiceFindById.mockResolvedValueOnce(personObject);
      const result = await resolver.uploadScreening(input);
      expect(result).toStrictEqual(expected);
      expect(mockInstrumentServiceQueryGetById).toBeCalledTimes(1);
      expect(mockInstrumentServiceQueryGetById).toBeCalledWith(
        input.instrumentId,
      );
      expect(mockScreeningServiceCreateOne).toBeCalledTimes(1);
      expect(mockScreeningServiceCreateOne).toBeCalledWith(input.input);
      expect(mockScreeningServiceSetRelation).toBeCalledTimes(2);
      expect(mockScreeningServiceSetRelation).toBeCalledWith(
        relationIdInstrument,
        expected.id,
        releasedInstrumentEntity.id,
      );
      expect(mockScreeningServiceSetRelation).toBeCalledWith(
        relationIdPerson,
        expected.id,
        personObject.id,
      );
      expect(mockPersonServiceFindById).toBeCalledTimes(1);
      expect(mockPersonServiceFindById).toBeCalledWith(input.personId);
    });
  });

  describe('getScreeningsForPersonAndInstrument', () => {
    it('should return connection type', async () => {
      const screeningConnetionSpy = jest
        .spyOn(ScreeningConnection, 'createFromPromise')
        .mockImplementation();
      const input: GetScreeningsByPersonAndInstrumentArgsType = {
        instrumentId: emptyScreeningObject.id,
        personId: personObject.id,
      };
      await resolver.getScreeningsForPersonAndInstrument(input);
      expect(screeningConnetionSpy).toBeCalledTimes(1);
      const expectedQuery: Query<ScreeningObject> = {
        filter: {
          ...input.filter,
          ...{
            'person.id': { eq: input.personId },
            'instrument.id': { eq: input.instrumentId },
          },
        },
      };
      expect(screeningConnetionSpy).toBeCalledWith(
        expect.any(Function),
        expectedQuery,
      );
    });
  });

  describe('getScreeningsDiagramCollections', () => {
    const generateExpectedQA = (
      query: GetScreeningsByPersonAndInstrumentArgsType,
    ) => {
      return {
        sorting: query.sorting,
        filter: {
          ...query.filter,
          ...{
            'person.id': { eq: query.personId },
            'instrument.id': { eq: query.instrumentId },
          },
        },
      };
    };

    const screeningObject = generateScreeningObject({});
    const screeningEntity = generateScreeningEntity({});
    const diagramPlotData: DiagramPlotDataClass = {
      type: 'test',
      axis: [
        { name: 'test1', rule: 'number + 1' },
        { name: 'test2', rule: 'number + 2' },
      ],
    };
    const diagramPlotClass: DiagramPlotClass = {
      test: diagramPlotData,
    };
    const instrumentEntity = generateInstrumentEntity({
      diagram: {
        collection: diagramPlotClass,
      },
    });
    const screeningObjects = [screeningObject];
    const screeningEntities = [screeningEntity];

    it('should return empty list on zero screenings', async () => {
      const input: GetScreeningsByPersonAndInstrumentArgsType = {
        instrumentId: retiredState,
        personId: 'missingPersonId',
      };
      mockInstrumentServiceQueryGetById.mockResolvedValueOnce(instrumentEntity);
      mockScreeningServiceQuery.mockResolvedValueOnce(screeningObjects);
      mockScreeningServiceAssemblerConvertAsyncToEntities.mockResolvedValueOnce(
        screeningEntities,
      );
      mockDiagramServiceCreatePlots.mockReturnValueOnce([]);
      const result = await resolver.getScreeningsDiagramCollections(input);
      expect(result).toStrictEqual([]);
      expect(mockInstrumentServiceQueryGetById).toBeCalledTimes(1);
      expect(mockInstrumentServiceQueryGetById).toBeCalledWith(
        input.instrumentId,
      );
      const expectedQA = generateExpectedQA(input);
      expect(mockScreeningServiceQuery).toBeCalledTimes(1);
      expect(mockScreeningServiceQuery).toBeCalledWith(expectedQA);
      expect(
        mockScreeningServiceAssemblerConvertAsyncToEntities,
      ).toBeCalledTimes(1);
      expect(
        mockScreeningServiceAssemblerConvertAsyncToEntities,
      ).toBeCalledWith(Promise.resolve(screeningObjects));
      expect(mockDiagramServiceCreatePlots).toBeCalledTimes(1);
      expect(mockDiagramServiceCreatePlots).toBeCalledWith(
        diagramPlotClass,
        screeningEntities,
      );
    });

    //it('should return empty list on zero diagram collections', async () => {
    //  const input: GetScreeningsByPersonAndInstrumentArgsType = {
    //    instrumentId: draftState,
    //    personId: missingPersonId,
    //  };
    //  const result = await resolver.getScreeningsDiagramCollections(input);
    //  expect(result).toStrictEqual([]);
    //});
    //
    //it('should return data plots', async () => {
    //  const input: GetScreeningsByPersonAndInstrumentArgsType = {
    //    instrumentId: releasedState,
    //    personId: 'personId',
    //  };
    //  const result = await resolver.getScreeningsDiagramCollections(input);
    //  expect(result).toHaveLength(1);
    //});
  });

  describe('resolveScreeningIssues', () => {
    const input: ResolveOneScreeningInputType = {
      id: 'resolveIdTest',
      update: {
        resolvedAt: new Date(),
        resolveComment: 'resolved issues',
      },
    };
    const expectedDTO = {
      isResolved: true,
      resolvedAt: input.update.resolvedAt,
      resolveComment: input.update.resolveComment,
    };

    it('should resolve screening', async () => {
      await resolver.resolveScreeningIssues(input);
      expect(mockScreeningServiceUpdateOne).toBeCalledTimes(1);
      expect(mockScreeningServiceUpdateOne).toBeCalledWith(
        input.id,
        expectedDTO,
      );
    });
  });

  describe('resolveUserAgent', () => {
    const userAgent: UserAgentClass = {
      device: 'pc',
      os: 'windows',
      application: 'test',
    };

    it('should return user agent', () => {
      const screening = generateScreeningEntity({ userAgent: userAgent });
      const result = resolver.resolveUserAgent(screening);
      expect(result).toStrictEqual(userAgent);
    });
  });

  describe('resolveEvaluationResult', () => {
    it("should throw error if screening can't be resolved", async () => {
      const screening = generateScreeningObject({
        id: 'invalidScreeningId',
      });
      mockScreeningServiceFindRelation.mockResolvedValueOnce(undefined);
      expect.assertions(3);
      try {
        await resolver.resolveEvaluationResult(screening);
        fail();
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundApiException);
      }
      expect(mockScreeningServiceFindRelation).toBeCalledTimes(1);
      expect(mockScreeningServiceFindRelation).toBeCalledWith(
        InstrumentObject,
        'instrument',
        screening,
      );
    });

    const screeningObject = generateScreeningObject({
      id: 'screeningObjectId',
    });
    const screeningEntity = generateScreeningEntity({
      id: 'screeningEntityId',
    });
    const instrumentEntity = generateInstrumentEntity({
      id: 'instrumentEntityId',
    });
    const instrumentObject = generateInstrumentObject({
      id: 'instrumentObjectId',
    });

    it('should return empty list if evaluation returns empty list', async () => {
      mockScreeningServiceFindRelation.mockResolvedValueOnce(instrumentObject);
      mockScreeningServiceQueryGetById.mockResolvedValueOnce(screeningEntity);
      mockInstrumentServiceQueryGetById.mockResolvedValueOnce(instrumentEntity);
      mockEvaluationServiceEvaluate.mockReturnValueOnce([]);
      const result = await resolver.resolveEvaluationResult(screeningObject);
      expect(result).toStrictEqual([]);
      expect(mockScreeningServiceFindRelation).toBeCalledTimes(1);
      expect(mockScreeningServiceFindRelation).toBeCalledWith(
        InstrumentObject,
        'instrument',
        screeningObject,
      );
      expect(mockScreeningServiceQueryGetById).toBeCalledTimes(1);
      expect(mockScreeningServiceQueryGetById).toBeCalledWith(
        screeningObject.id,
      );
      expect(mockInstrumentServiceQueryGetById).toBeCalledTimes(1);
      expect(mockInstrumentServiceQueryGetById).toBeCalledWith(
        instrumentObject.id,
      );
      expect(mockEvaluationServiceEvaluate).toBeCalledTimes(1);
      expect(mockEvaluationServiceEvaluate).toBeCalledWith(
        screeningEntity,
        instrumentEntity,
      );
    });

    const successfullEvaluationClass: EvaluationClass = {
      result: true,
      name: 'success',
      condition: 'valid',
      then: 'true',
      else: 'false',
    };

    const failedEvaluationClass: EvaluationClass = {
      result: null,
      name: 'failed',
      condition: 'invalid',
      then: 'fail',
      else: 'wrong',
    };

    const successfullEvaluationObject: EvaluationObject = {
      ...successfullEvaluationClass,
    } as EvaluationObject;

    const failedEvalutaionObject: EvaluationObject = {
      ...failedEvaluationClass,
    } as EvaluationObject;

    it('should return list of evaluations', async () => {
      mockScreeningServiceFindRelation.mockResolvedValueOnce(instrumentObject);
      mockScreeningServiceQueryGetById.mockResolvedValueOnce(screeningEntity);
      mockInstrumentServiceQueryGetById.mockResolvedValueOnce(instrumentEntity);
      mockEvaluationServiceEvaluate.mockReturnValueOnce([
        successfullEvaluationClass,
        failedEvaluationClass,
      ]);
      const result = await resolver.resolveEvaluationResult(screeningObject);
      expect(result).toHaveLength(2);
      expect(result).toStrictEqual([
        successfullEvaluationObject,
        failedEvalutaionObject,
      ]);
      expect(mockScreeningServiceFindRelation).toBeCalledTimes(1);
      expect(mockScreeningServiceFindRelation).toBeCalledWith(
        InstrumentObject,
        'instrument',
        screeningObject,
      );
      expect(mockScreeningServiceQueryGetById).toBeCalledTimes(1);
      expect(mockScreeningServiceQueryGetById).toBeCalledWith(
        screeningObject.id,
      );
      expect(mockInstrumentServiceQueryGetById).toBeCalledTimes(1);
      expect(mockInstrumentServiceQueryGetById).toBeCalledWith(
        instrumentObject.id,
      );
      expect(mockEvaluationServiceEvaluate).toBeCalledTimes(1);
      expect(mockEvaluationServiceEvaluate).toBeCalledWith(
        screeningEntity,
        instrumentEntity,
      );
    });
  });
});
