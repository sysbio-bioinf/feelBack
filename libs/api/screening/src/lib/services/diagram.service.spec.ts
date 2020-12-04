import { Test, TestingModule } from '@nestjs/testing';
import { DiagramService } from './diagram.service';
import { EvaluationService } from './evaluation.service';
import {
  DiagramPlotAxisDataClass,
  DiagramPlotClass,
  DiagramPlotDataClass,
  ScreeningEntity,
} from '@feelback-app/api/data';
import { DiagramDataPointObject } from '@feelback-app/api/interfaces';

// Mock logging for invalid inputs in "createAxisDataPoint".
console.log = jest.fn();

describe('DiagramService', () => {
  let service: DiagramService;
  let screenings: ScreeningEntity[];
  let plotData: DiagramPlotDataClass;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiagramService, EvaluationService],
    }).compile();

    service = module.get<DiagramService>(DiagramService);

    screenings = [];
    const screening1 = new ScreeningEntity();
    screening1.id = '1';
    screening1.collectedAt = new Date();
    screening1.payload = { number: 0 };
    screenings.push(screening1);
    const screening2 = new ScreeningEntity();
    screening2.id = '2';
    screening2.collectedAt = new Date();
    screening2.payload = { number: 1 };
    screenings.push(screening2);

    plotData = {
      type: 'test',
      axis: [
        { name: 'test1', rule: 'number + 1' },
        { name: 'test2', rule: 'number + 2' },
      ],
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createPlots', () => {
    it('should return empty array', () => {
      const emptyPlots: DiagramPlotClass = {};
      const result = service.createPlots(emptyPlots, screenings);
      expect(result).toStrictEqual([]);
    });

    it('should create plots', () => {
      const simpleScreenings = screenings.slice(0, 1);
      const simplePlotData: DiagramPlotDataClass = {
        type: plotData.type,
        axis: plotData.axis.slice(0, 1),
      };
      const plots: DiagramPlotClass = {
        testName: simplePlotData,
      };
      const result = service.createPlots(plots, simpleScreenings);
      expect(result).toHaveLength(1);
      expect(result[0].name).toStrictEqual('testName');
      expect(result[0].type).toStrictEqual(simplePlotData.type);
      expect(result[0].axis).toHaveLength(1);
      expect(result[0].axis[0].name).toStrictEqual(simplePlotData.axis[0].name);
      const diagramDataPoints = result[0].axis[0].data;
      expect(diagramDataPoints).toHaveLength(1);
      expect(diagramDataPoints[0].screeningId).toStrictEqual(
        simpleScreenings[0].id,
      );
      expect(diagramDataPoints[0].x).toStrictEqual(
        simpleScreenings[0].collectedAt,
      );
      expect(diagramDataPoints[0].y).toStrictEqual(1);
    });
  });

  describe('createPlot', () => {
    it('should create plot', () => {
      const simpleScreenings = screenings.slice(0, 1);
      const simplePlotData: DiagramPlotDataClass = {
        type: plotData.type,
        axis: plotData.axis.slice(0, 1),
      };
      const plotName = 'testPlot';
      const result = service.createPlot(
        plotName,
        simplePlotData,
        simpleScreenings,
      );
      expect(result.name).toStrictEqual(plotName);
      expect(result.type).toStrictEqual(simplePlotData.type);
      expect(result.axis).toHaveLength(1);
      expect(result.axis[0].name).toStrictEqual(simplePlotData.axis[0].name);
      const diagramDataPoints = result.axis[0].data;
      expect(diagramDataPoints).toHaveLength(1);
      expect(diagramDataPoints[0].screeningId).toStrictEqual(
        simpleScreenings[0].id,
      );
      expect(diagramDataPoints[0].x).toStrictEqual(
        simpleScreenings[0].collectedAt,
      );
      expect(diagramDataPoints[0].y).toStrictEqual(1);
    });
  });

  describe('createAxis', () => {
    it('should return empty array', () => {
      const emptyPlotData: DiagramPlotDataClass = {
        type: 'empty',
        axis: [],
      };
      const result = service.createAxis(emptyPlotData, screenings);
      expect(result).toStrictEqual([]);
    });

    it('should return empty data values', () => {
      const result = service.createAxis(plotData, []);
      expect(result).toHaveLength(2);
      expect(result[0].name).toStrictEqual(plotData.axis[0].name);
      expect(result[0].data).toStrictEqual([]);
      expect(result[1].name).toStrictEqual(plotData.axis[1].name);
      expect(result[1].data).toStrictEqual([]);
    });

    it('should create axis', () => {
      const result = service.createAxis(plotData, screenings);
      // plotData contains 2 axis-object
      expect(result).toHaveLength(2);
      expect(result[0].name).toStrictEqual(plotData.axis[0].name);
      // screenings contains 2 screening-entities
      expect(result[0].data).toHaveLength(2);
      // check result of rule in plotData for each screening
      expect(result[0].data[0].screeningId).toStrictEqual(screenings[0].id);
      expect(result[0].data[0].x).toStrictEqual(screenings[0].collectedAt);
      expect(result[0].data[0].y).toStrictEqual(1);
      expect(result[0].data[1].screeningId).toStrictEqual(screenings[1].id);
      expect(result[0].data[1].x).toStrictEqual(screenings[1].collectedAt);
      expect(result[0].data[1].y).toStrictEqual(2);
      expect(result[1].name).toStrictEqual(plotData.axis[1].name);
      // screenings contains 2 screening-entities
      expect(result[1].data).toHaveLength(2);
      // check result of rule in plotData for each screening
      expect(result[1].data[0].screeningId).toStrictEqual(screenings[0].id);
      expect(result[1].data[0].x).toStrictEqual(screenings[0].collectedAt);
      expect(result[1].data[0].y).toStrictEqual(2);
      expect(result[1].data[1].screeningId).toStrictEqual(screenings[1].id);
      expect(result[1].data[1].x).toStrictEqual(screenings[1].collectedAt);
      expect(result[1].data[1].y).toStrictEqual(3);
    });
  });

  describe('createAxisDataPoints', () => {
    let validPlotAxisData: DiagramPlotAxisDataClass;
    let invalidPlotAxisData: DiagramPlotAxisDataClass;

    beforeEach(() => {
      validPlotAxisData = {
        name: '',
        rule: 'number + 1',
      };
      invalidPlotAxisData = {
        name: '',
        rule: 'invalid',
      };
    });

    it('should return empty array', () => {
      let result = service.createAxisDataPoints(validPlotAxisData, []);
      expect(result).toStrictEqual([]);
      result = service.createAxisDataPoints(invalidPlotAxisData, []);
      expect(result).toStrictEqual([]);
    });

    it('should create axis data points', () => {
      const result = service.createAxisDataPoints(
        validPlotAxisData,
        screenings,
      );
      expect(result).toHaveLength(screenings.length);
      expect(result[0].screeningId).toStrictEqual(screenings[0].id);
      expect(result[0].x).toStrictEqual(screenings[0].collectedAt);
      expect(result[0].y).toStrictEqual(1);
      expect(result[1].screeningId).toStrictEqual(screenings[1].id);
      expect(result[1].x).toStrictEqual(screenings[1].collectedAt);
      expect(result[1].y).toStrictEqual(2);
    });

    it('should contain invalid axis data points', () => {
      let result = service.createAxisDataPoints(
        invalidPlotAxisData,
        screenings,
      );
      expect(result).toHaveLength(2);
      expect(result[0].screeningId).toStrictEqual(screenings[0].id);
      expect(result[0].x).toStrictEqual(screenings[0].collectedAt);
      expect(result[0].y).toBeNull();
      expect(result[1].screeningId).toStrictEqual(screenings[1].id);
      expect(result[1].x).toStrictEqual(screenings[1].collectedAt);
      expect(result[1].y).toBeNull();
      const screeningWithoutNumber = new ScreeningEntity();
      screeningWithoutNumber.id = '3';
      screeningWithoutNumber.collectedAt = new Date();
      screeningWithoutNumber.payload = { wrong: 'value' };
      screenings.push(screeningWithoutNumber);
      result = service.createAxisDataPoints(validPlotAxisData, screenings);
      expect(result).toHaveLength(3);
      expect(result[0].screeningId).toStrictEqual(screenings[0].id);
      expect(result[0].x).toStrictEqual(screenings[0].collectedAt);
      expect(result[0].y).toStrictEqual(1);
      expect(result[1].screeningId).toStrictEqual(screenings[1].id);
      expect(result[1].x).toStrictEqual(screenings[1].collectedAt);
      expect(result[1].y).toStrictEqual(2);
      expect(result[2].screeningId).toStrictEqual(screenings[2].id);
      expect(result[2].x).toStrictEqual(screenings[2].collectedAt);
      expect(result[2].y).toBeNull();
    });
  });

  describe('createAxisDataPoint', () => {
    let screening: ScreeningEntity;

    beforeEach(() => {
      screening = new ScreeningEntity();
      screening.id = 'test';
      screening.collectedAt = new Date();
      screening.payload = { number: 5 };
    });

    it('should create valid axis data point', () => {
      const plotAxisData: DiagramPlotAxisDataClass = {
        name: '',
        rule: 'number + 1',
      };
      const expectedResult: DiagramDataPointObject = {
        screeningId: screening.id,
        x: screening.collectedAt,
        y: 6,
      };
      const result = service.createAxisDataPoint(plotAxisData, screening);
      expect(result).toStrictEqual(expectedResult);
    });

    it('should not create valid axis data point', () => {
      const invalidPlotAxisData: DiagramPlotAxisDataClass = {
        name: '',
        rule: 'invalid',
      };
      const result = service.createAxisDataPoint(
        invalidPlotAxisData,
        screening,
      );
      expect(result.screeningId).toStrictEqual(screening.id);
      expect(result.x).toStrictEqual(screening.collectedAt);
      expect(result.y).toBeNull();
    });
  });
});
