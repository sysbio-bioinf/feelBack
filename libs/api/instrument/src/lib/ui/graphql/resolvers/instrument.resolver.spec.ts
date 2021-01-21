import { GuardsModule } from '@feelback-app/api/auth';
import { InstrumentEntity, InstrumentStatesEnum } from '@feelback-app/api/data';
import {
  CopyOneInstrumentInputType,
  CreateOneInstrumentInputType,
  InstrumentObject,
  ReleaseOneInstrumentInputType,
  RetireOneInstrumentInputType,
  UpdateOneInstrumentInputType,
} from '@feelback-app/api/interfaces';
import {
  emptyInstrumentObject,
  generateInstrumentEntity,
  mockRepository,
} from '@feelback-app/api/testing';
import { InvalidStateApiException } from '@feelback-app/api/errors';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { InstrumentAssemblerService } from '../../../services/instrument-assembler.service';
import { InstrumentDatabaseService } from '../../../services/instrument-database.service';
import { InstrumentAssembler } from '../assemblers/instrument.assembler';
import { InstrumentResolver } from './instrument.resolver';
import { DeepPartial } from '@nestjs-query/core';

// Mocks for InstrumentAssemblerService
const mockInstrumentServiceCreateOne: jest.Mock<Promise<
  InstrumentObject
>> = jest.fn();
const mockInstrumentServiceQueryGetById: jest.Mock<Promise<
  InstrumentEntity
>> = jest.fn();
const mockInstrumentServiceUpdateOne: jest.Mock<Promise<
  InstrumentObject
>> = jest.fn();
const mockInstrumentServiceGetById: jest.Mock<Promise<
  InstrumentObject
>> = jest.fn();

describe('InstrumentResolver', () => {
  let resolver: InstrumentResolver;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      imports: [GuardsModule],
      providers: [
        InstrumentResolver,
        InstrumentAssemblerService,
        InstrumentAssembler,
        InstrumentDatabaseService,
        {
          provide: getRepositoryToken(InstrumentEntity),
          useClass: mockRepository,
        },
      ],
    }).compile();

    resolver = module.get<InstrumentResolver>(InstrumentResolver);
    const instrumentAssemblerService = module.get<InstrumentAssemblerService>(
      InstrumentAssemblerService,
    );
    // Set mocks for InstrumentAssemblerService
    instrumentAssemblerService.createOne = mockInstrumentServiceCreateOne;
    instrumentAssemblerService.queryService.getById = mockInstrumentServiceQueryGetById;
    instrumentAssemblerService.updateOne = mockInstrumentServiceUpdateOne;
    instrumentAssemblerService.getById = mockInstrumentServiceGetById;
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createOneInstrument', () => {
    const createOneEmptyInstrument: CreateOneInstrumentInputType = {
      input: {
        name: emptyInstrumentObject.name,
        description: emptyInstrumentObject.description,
        type: emptyInstrumentObject.type,
        changelog: emptyInstrumentObject.changelog,
      },
    };
    const expectedDTO: DeepPartial<InstrumentObject> = {
      ...createOneEmptyInstrument.input,
      state: InstrumentStatesEnum.DRAFT,
    };

    it('should return instrument object', async () => {
      // Set mocks
      mockInstrumentServiceCreateOne.mockResolvedValueOnce(
        emptyInstrumentObject,
      );
      // Call methnod
      const result = await resolver.createOneInstrument(
        createOneEmptyInstrument,
      );
      // Expect
      expect(result).toStrictEqual(emptyInstrumentObject);
      expect(mockInstrumentServiceCreateOne).toBeCalledTimes(1);
      expect(mockInstrumentServiceCreateOne).toBeCalledWith(expectedDTO);
    });
  });

  describe('updateOneInstrument', () => {
    const input: UpdateOneInstrumentInputType = {
      id: 'draft!',
      update: { changelog: 'changes!' },
    };
    const draftInstrument = generateInstrumentEntity({
      id: input.id,
      state: InstrumentStatesEnum.DRAFT,
    });
    const releasedInstrument = generateInstrumentEntity({
      state: InstrumentStatesEnum.RELEASED,
    });
    const retiredInstrument = generateInstrumentEntity({
      state: InstrumentStatesEnum.RETIRED,
    });

    it('should throw error if state is released', async () => {
      // Set mocks
      mockInstrumentServiceQueryGetById.mockResolvedValueOnce(
        releasedInstrument,
      );
      // Call method
      try {
        await resolver.updateOneInstrument(input);
        fail();
      } catch (error) {
        // Expect
        expect(error).toBeInstanceOf(InvalidStateApiException);
      }
      expect(mockInstrumentServiceQueryGetById).toBeCalledTimes(1);
      expect(mockInstrumentServiceQueryGetById).toBeCalledWith(input.id);
    });

    it('should throw error if state is retired', async () => {
      // Set mocks
      mockInstrumentServiceQueryGetById.mockResolvedValueOnce(
        retiredInstrument,
      );
      // Call method
      try {
        await resolver.updateOneInstrument(input);
        fail();
      } catch (error) {
        // Expect
        expect(error).toBeInstanceOf(InvalidStateApiException);
      }
      expect(mockInstrumentServiceQueryGetById).toBeCalledTimes(1);
      expect(mockInstrumentServiceQueryGetById).toBeCalledWith(input.id);
    });

    it('should return instrument object', async () => {
      // Set mocks
      mockInstrumentServiceQueryGetById.mockResolvedValueOnce(draftInstrument);
      mockInstrumentServiceUpdateOne.mockResolvedValueOnce(
        emptyInstrumentObject,
      );
      // Call method
      const result = await resolver.updateOneInstrument(input);
      // Expect
      expect(result).toStrictEqual(emptyInstrumentObject);
      expect(mockInstrumentServiceQueryGetById).toBeCalledTimes(1);
      expect(mockInstrumentServiceQueryGetById).toBeCalledWith(input.id);
      expect(mockInstrumentServiceUpdateOne).toBeCalledTimes(1);
      expect(mockInstrumentServiceUpdateOne).toBeCalledWith(
        draftInstrument.id,
        input.update,
      );
    });
  });

  describe('releaseInstrument', () => {
    const input: ReleaseOneInstrumentInputType = {
      id: 'draft!',
    };
    const draftInstrument = generateInstrumentEntity({
      id: input.id,
      state: InstrumentStatesEnum.DRAFT,
    });
    const releasedInstrument = generateInstrumentEntity({
      state: InstrumentStatesEnum.RELEASED,
    });
    const retiredInstrument = generateInstrumentEntity({
      state: InstrumentStatesEnum.RETIRED,
    });

    it('should throw error if state is released', async () => {
      // Set mocks
      mockInstrumentServiceQueryGetById.mockResolvedValueOnce(
        releasedInstrument,
      );
      // Call method
      try {
        await resolver.releaseInstrument(input);
        fail();
      } catch (error) {
        // Expect
        expect(error).toBeInstanceOf(InvalidStateApiException);
      }
      expect(mockInstrumentServiceQueryGetById).toBeCalledTimes(1);
      expect(mockInstrumentServiceQueryGetById).toBeCalledWith(input.id);
    });

    it('should throw error if state is retired', async () => {
      // Set mocks
      mockInstrumentServiceQueryGetById.mockResolvedValueOnce(
        retiredInstrument,
      );
      // Call method
      try {
        await resolver.releaseInstrument(input);
        fail();
      } catch (error) {
        // Expect
        expect(error).toBeInstanceOf(InvalidStateApiException);
      }
      expect(mockInstrumentServiceQueryGetById).toBeCalledTimes(1);
      expect(mockInstrumentServiceQueryGetById).toBeCalledWith(input.id);
    });

    it('should return instrument object', async () => {
      // Set mocks
      mockInstrumentServiceQueryGetById.mockResolvedValueOnce(draftInstrument);
      mockInstrumentServiceUpdateOne.mockResolvedValueOnce(
        emptyInstrumentObject,
      );
      // Call method
      const result = await resolver.releaseInstrument(input);
      // Expect
      expect(result).toStrictEqual(emptyInstrumentObject);
      expect(mockInstrumentServiceQueryGetById).toBeCalledTimes(1);
      expect(mockInstrumentServiceQueryGetById).toBeCalledWith(input.id);
      expect(mockInstrumentServiceUpdateOne).toBeCalledTimes(1);
      expect(mockInstrumentServiceUpdateOne).toBeCalledWith(
        draftInstrument.id,
        {
          state: InstrumentStatesEnum.RELEASED,
        },
      );
    });
  });

  describe('retireInstrument', () => {
    const input: RetireOneInstrumentInputType = {
      id: 'retired!',
    };
    const draftInstrument = generateInstrumentEntity({
      state: InstrumentStatesEnum.DRAFT,
    });
    const releasedInstrument = generateInstrumentEntity({
      id: input.id,
      state: InstrumentStatesEnum.RELEASED,
    });
    const retiredInstrument = generateInstrumentEntity({
      state: InstrumentStatesEnum.RETIRED,
    });

    it('should throw error if state is retired', async () => {
      // Set mocks
      mockInstrumentServiceQueryGetById.mockResolvedValueOnce(
        retiredInstrument,
      );
      // Call method
      try {
        await resolver.retireInstrument(input);
        fail();
      } catch (error) {
        // Expect
        expect(error).toBeInstanceOf(InvalidStateApiException);
      }
      expect(mockInstrumentServiceQueryGetById).toBeCalledTimes(1);
      expect(mockInstrumentServiceQueryGetById).toBeCalledWith(input.id);
    });

    it('should throw error if state is draft', async () => {
      // Set mocks
      mockInstrumentServiceQueryGetById.mockResolvedValueOnce(draftInstrument);
      // Call method
      try {
        await resolver.retireInstrument(input);
        fail();
      } catch (error) {
        // Expect
        expect(error).toBeInstanceOf(InvalidStateApiException);
      }
      expect(mockInstrumentServiceQueryGetById).toBeCalledTimes(1);
      expect(mockInstrumentServiceQueryGetById).toBeCalledWith(input.id);
    });

    it('should return instrument object', async () => {
      // Set mocks
      mockInstrumentServiceQueryGetById.mockResolvedValueOnce(
        releasedInstrument,
      );
      mockInstrumentServiceUpdateOne.mockResolvedValueOnce(
        emptyInstrumentObject,
      );
      // Call method
      const result = await resolver.retireInstrument(input);
      // Expect
      expect(result).toStrictEqual(emptyInstrumentObject);
      expect(mockInstrumentServiceQueryGetById).toBeCalledTimes(1);
      expect(mockInstrumentServiceQueryGetById).toBeCalledWith(input.id);
      expect(mockInstrumentServiceUpdateOne).toBeCalledTimes(1);
      expect(mockInstrumentServiceUpdateOne).toBeCalledWith(
        releasedInstrument.id,
        {
          state: InstrumentStatesEnum.RETIRED,
        },
      );
    });
  });

  describe('copyInstrument', () => {
    const input: CopyOneInstrumentInputType = {
      id: 'copyId',
    };
    const expectedDTO = {
      changelog: `initial version - copied from instrument ${emptyInstrumentObject.name} (${emptyInstrumentObject.id})`,
      name: `${emptyInstrumentObject.name} (copy)`,
      description: emptyInstrumentObject.description,
      type: emptyInstrumentObject.type,
      image: emptyInstrumentObject.image,
      payload: emptyInstrumentObject.payload,
      rules: emptyInstrumentObject.rules,
      diagram: emptyInstrumentObject.diagram,
      state: InstrumentStatesEnum.DRAFT,
    };

    it('should return instrument object', async () => {
      // Set mocks
      mockInstrumentServiceGetById.mockResolvedValueOnce(emptyInstrumentObject);
      // Call method
      await resolver.copyInstrument(input);
      // Expect
      expect(mockInstrumentServiceGetById).toBeCalledTimes(1);
      expect(mockInstrumentServiceGetById).toBeCalledWith(input.id);
      expect(mockInstrumentServiceCreateOne).toBeCalledTimes(1);
      expect(mockInstrumentServiceCreateOne).toBeCalledWith(expectedDTO);
    });
  });
});
