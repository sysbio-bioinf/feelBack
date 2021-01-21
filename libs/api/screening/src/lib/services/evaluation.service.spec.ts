import { InstrumentEntity, ScreeningEntity } from '@feelback-app/api/data';
import { Test, TestingModule } from '@nestjs/testing';
import { EvaluationService } from './evaluation.service';

// Mock to avoid logging in "evaluateRule"
console.log = jest.fn();

describe('EvaluationService', () => {
  let service: EvaluationService;
  const screening = new ScreeningEntity();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EvaluationService],
    }).compile();

    service = module.get<EvaluationService>(EvaluationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('evaluate', () => {
    const instrument = new InstrumentEntity();

    it('should return empty list if instrument has no rules', () => {
      instrument.rules = [];
      screening.payload = {
        foo: true,
        bar: 5,
      };
      const result = service.evaluate(screening, instrument);
      expect(result).toStrictEqual([]);
    });

    it('should evaluate correctly', () => {
      instrument.rules = [
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
      screening.payload = {
        foo: true,
        bar: 5,
      };
      const result = service.evaluate(screening, instrument);
      expect(result).toHaveLength(2);
      expect(result[0]).toMatchObject({ result: true });
      expect(result[1]).toMatchObject({ result: false });
    });

    it('should not evaluate correctly', () => {
      instrument.rules = [
        {
          name: 'rule1',
          condition: 'x == "foobar',
          then: 'rule1 then',
          else: 'rule1 else',
        },
        {
          name: 'rule2',
          condition: 'y >= 100',
          then: 'rule2 then',
          else: 'rule2 else',
        },
      ];

      screening.payload = {
        x: 'foobar',
      };
      const result = service.evaluate(screening, instrument);
      expect(result).toHaveLength(2);
      expect(result[0]).toMatchObject({ result: null });
      expect(result[1]).toMatchObject({ result: null });
    });
  });

  describe('evaluateRule', () => {
    it('should evaluate correctly', () => {
      screening.payload = {
        foo: true,
        bar: 5,
      };
      let rule = 'foo == true';
      let result = service.evaluateRule(rule, screening.getScreeningData());
      expect(result).toBe(true);
      rule = 'bar > 5';
      result = service.evaluateRule(rule, screening.getScreeningData());
      expect(result).toBe(false);
      rule = 'bar + 1';
      result = service.evaluateRule(rule, screening.getScreeningData());
      expect(result).toBe(6);
    });

    it('should not evaluate correctly', () => {
      screening.payload = {
        foo: 'str',
      };
      const invalidSyntax = 'foo == "str';
      let result = service.evaluateRule(
        invalidSyntax,
        screening.getScreeningData(),
      );
      expect(result).toBeNull();
      const nonExistantParameter = 'x > 5';
      result = service.evaluateRule(
        nonExistantParameter,
        screening.getScreeningData(),
      );
      expect(result).toBeNull();
    });
  });
});
