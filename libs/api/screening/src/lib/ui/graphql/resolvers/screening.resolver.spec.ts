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
  DiagramDataObject,
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
const mockScreeningServiceCreateOne: jest.Mock<Promise<
  ScreeningObject
>> = jest.fn();
const mockScreeningServiceSetRelation: jest.Mock<Promise<
  ScreeningObject
>> = jest.fn();
const mockScreeningServiceQuery: jest.Mock<Promise<
  ScreeningObject[]
>> = jest.fn();
const mockScreeningServiceUpdateOne: jest.Mock<Promise<
  ScreeningObject
>> = jest.fn();
const mockScreeningServiceFindRelation = jest.fn();
const mockScreeningServiceQueryGetById: jest.Mock<Promise<
  ScreeningEntity
>> = jest.fn();
// Mocks for InstrumentAssemblerService
const mockInstrumentServiceQueryGetById: jest.Mock<Promise<
  InstrumentEntity
>> = jest.fn();
// Mocks for PersonAssemblerService
const mockPersonServiceFindById: jest.Mock<Promise<
  PersonObject | undefined
>> = jest.fn();

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
    // Generate UploadInput with relevant attributes
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
      // Set mocks
      mockInstrumentServiceQueryGetById.mockResolvedValueOnce(
        releasedInstrumentEntity,
      );
      mockScreeningServiceCreateOne.mockResolvedValueOnce(expected);
      // Call method
      const result = await resolver.uploadScreening(input);
      // Expect
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
      // Set mocks
      mockInstrumentServiceQueryGetById.mockResolvedValueOnce(
        releasedInstrumentEntity,
      );
      mockScreeningServiceCreateOne.mockResolvedValueOnce(expected);
      mockPersonServiceFindById.mockResolvedValueOnce(undefined);
      // Call method
      const result = await resolver.uploadScreening(input);
      // Expect
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
      // Set mocks
      mockInstrumentServiceQueryGetById.mockResolvedValueOnce(
        releasedInstrumentEntity,
      );
      mockScreeningServiceCreateOne.mockResolvedValueOnce(expected);
      mockPersonServiceFindById.mockResolvedValueOnce(personObject);
      // Call method
      const result = await resolver.uploadScreening(input);
      // Expect
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
      // Mock method to check for correct inputs
      const screeningConnetionSpy = jest.spyOn(
        ScreeningConnection,
        'createFromPromise',
      );
      const input: GetScreeningsByPersonAndInstrumentArgsType = {
        instrumentId: emptyScreeningObject.id,
        personId: personObject.id,
      };
      await resolver.getScreeningsForPersonAndInstrument(input);
      // Excpected query generated by getScreeningsForPersonAndInstrument
      const expectedQuery: Query<ScreeningObject> = {
        filter: {
          ...input.filter,
          ...{
            'person.id': { eq: input.personId },
            'instrument.id': { eq: input.instrumentId },
          },
        },
      };
      // Check correct inputs
      expect(screeningConnetionSpy).toBeCalledWith(
        expect.any(Function),
        expectedQuery,
      );
    });
  });

  describe('getScreeningsDiagramCollections', () => {
    // Expected QA for ScreeningAssemblerService.query
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

    // DiagramPlots for InstrumentEntity
    const axis1 = 'axis1';
    const axis2 = 'axis2';
    const diagramPlotData: DiagramPlotDataClass = {
      type: 'test',
      axis: [
        { name: axis1, rule: 'number + 1' },
        { name: axis2, rule: 'invalidRule' },
      ],
    };
    const testAxis = 'testAxis';
    const diagramPlotClass: DiagramPlotClass = {
      testAxis: diagramPlotData,
    };
    const instrumentEntity = generateInstrumentEntity({
      diagram: {
        collection: diagramPlotClass,
      },
    });

    const screeningObject = generateScreeningObject({});
    const screeningObjects = [screeningObject];

    // ScreeningEntity with payload
    const payload = {
      number: 8,
    };
    const screeningEntity = generateScreeningEntity({
      id: 'plottedScreeningEntity',
      payload: payload,
      getScreeningData: () => payload,
    });
    const screeningEntities = [screeningEntity];

    it('should return empty list on zero screenings', async () => {
      const input: GetScreeningsByPersonAndInstrumentArgsType = {
        instrumentId: retiredState,
        personId: 'missingPersonId',
      };
      // Set mocks
      mockInstrumentServiceQueryGetById.mockResolvedValueOnce(instrumentEntity);
      mockScreeningServiceQuery.mockResolvedValueOnce([]);
      const result = await resolver.getScreeningsDiagramCollections(input);
      // result has 1 entry since diagramPlotClass has 1 attribute 'testAchse'
      expect(result).toHaveLength(1);
      const plotted: DiagramDataObject = result[0];
      expect(plotted.type).toStrictEqual(diagramPlotData.type);
      expect(plotted.name).toStrictEqual(testAxis);
      // Axis has 2 entries since diagramPlotData.axis has 2 entries
      expect(plotted.axis).toHaveLength(2);
      expect(plotted.axis[0].name).toStrictEqual(axis1);
      // Data is empty since there are no screenings
      expect(plotted.axis[0].data).toStrictEqual([]);
      expect(plotted.axis[1].name).toStrictEqual(axis2);
      expect(plotted.axis[1].data).toStrictEqual([]);
      expect(mockInstrumentServiceQueryGetById).toBeCalledTimes(1);
      expect(mockInstrumentServiceQueryGetById).toBeCalledWith(
        input.instrumentId,
      );
      const expectedQA = generateExpectedQA(input);
      expect(mockScreeningServiceQuery).toBeCalledTimes(1);
      expect(mockScreeningServiceQuery).toBeCalledWith(expectedQA);
    });

    it('should return data plots', async () => {
      const input: GetScreeningsByPersonAndInstrumentArgsType = {
        instrumentId: releasedState,
        personId: 'personId',
      };
      // Set mocks
      mockInstrumentServiceQueryGetById.mockResolvedValueOnce(instrumentEntity);
      mockScreeningServiceQuery.mockResolvedValueOnce(screeningEntities);
      // Call method
      const result = await resolver.getScreeningsDiagramCollections(input);
      // result has 1 entry since diagramPlotClass has 1 attribute 'testAxis'
      expect(result).toHaveLength(1);
      const plotted: DiagramDataObject = result[0];
      expect(plotted.type).toStrictEqual(diagramPlotData.type);
      expect(plotted.name).toStrictEqual(testAxis);
      // Axis has 2 entries since diagramPlotData.axis has 2 entries
      expect(plotted.axis).toHaveLength(2);
      expect(plotted.axis[0].name).toStrictEqual(axis1);
      // Data has entry for each screening
      // y is result of applying rule of each axis of diagramPlotData to screeningEntity.payload
      expect(plotted.axis[0].data).toStrictEqual([
        {
          screeningId: screeningEntity.id,
          x: screeningEntity.collectedAt,
          y: 9,
        },
      ]);
      expect(plotted.axis[1].name).toStrictEqual(axis2);
      // y is null since rule of axis2 of diagramPlotData is invalid
      expect(plotted.axis[1].data).toStrictEqual([
        {
          screeningId: screeningEntity.id,
          x: screeningEntity.collectedAt,
          y: null,
        },
      ]);
      expect(mockInstrumentServiceQueryGetById).toBeCalledTimes(1);
      expect(mockInstrumentServiceQueryGetById).toBeCalledWith(
        input.instrumentId,
      );
      const expectedQA = generateExpectedQA(input);
      expect(mockScreeningServiceQuery).toBeCalledTimes(1);
      expect(mockScreeningServiceQuery).toBeCalledWith(expectedQA);
    });

    it('should return empty list on zero diagram collections', async () => {
      const input: GetScreeningsByPersonAndInstrumentArgsType = {
        instrumentId: draftState,
        personId: 'missingPersonId',
      };
      // Set collection to empty object
      instrumentEntity.diagram.collection = {};
      // Set mocks
      mockInstrumentServiceQueryGetById.mockResolvedValueOnce(instrumentEntity);
      mockScreeningServiceQuery.mockResolvedValueOnce(screeningObjects);
      // Call method
      const result = await resolver.getScreeningsDiagramCollections(input);
      // Expect
      expect(result).toStrictEqual([]);
      expect(mockInstrumentServiceQueryGetById).toBeCalledTimes(1);
      expect(mockInstrumentServiceQueryGetById).toBeCalledWith(
        input.instrumentId,
      );
      const expectedQA = generateExpectedQA(input);
      expect(mockScreeningServiceQuery).toBeCalledTimes(1);
      expect(mockScreeningServiceQuery).toBeCalledWith(expectedQA);
    });
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
      // Call method
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
      payload: {
        foo: true,
        bar: 5,
      },
    });
    const instrumentEntity = generateInstrumentEntity({
      id: 'instrumentEntityId',
    });
    const instrumentObject = generateInstrumentObject({
      id: 'instrumentObjectId',
    });

    it('should return empty list if evaluation returns empty list', async () => {
      // Set mocks
      mockScreeningServiceFindRelation.mockResolvedValueOnce(instrumentObject);
      mockScreeningServiceQueryGetById.mockResolvedValueOnce(screeningEntity);
      mockInstrumentServiceQueryGetById.mockResolvedValueOnce(instrumentEntity);
      // Empty rules, so nothing can be evaluated
      instrumentEntity.rules = [];
      // Call method
      const result = await resolver.resolveEvaluationResult(screeningObject);
      // Expect
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
    });

    const payload = {
      foo: true,
      bar: 5,
    };
    const payloadScreeningEntity = generateScreeningEntity({
      id: 'payloadScreening',
      payload: payload,
      getScreeningData: () => payload,
    });

    it('should return list of evaluations', async () => {
      instrumentEntity.rules = [
        {
          name: 'rule1',
          condition: 'foo == true',
          then: 'rule1 then',
          else: 'rule1 else',
        },
        {
          name: 'rule2',
          condition: 'bar < 3',
          then: 'rule2 then',
          else: 'rule2 else',
        },
      ];
      // Set mocks
      mockScreeningServiceFindRelation.mockResolvedValueOnce(instrumentObject);
      mockScreeningServiceQueryGetById.mockResolvedValueOnce(
        payloadScreeningEntity,
      );
      mockInstrumentServiceQueryGetById.mockResolvedValueOnce(instrumentEntity);
      // Call method
      const result = await resolver.resolveEvaluationResult(screeningObject);
      // result has 2 entries since there are 2 rules
      expect(result).toHaveLength(2);
      expect(result).toStrictEqual([
        { ...instrumentEntity.rules[0], result: true },
        { ...instrumentEntity.rules[1], result: false },
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
    });
  });
});
