import { InstrumentEntity, ScreeningEntity } from '@feelback-app/api/data';
import { Test, TestingModule } from '@nestjs/testing';
import { EvaluationService } from './evaluation.service';

describe('EvaluationService', () => {
  let service: EvaluationService;
  let screening: ScreeningEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EvaluationService],
    }).compile();

    service = module.get<EvaluationService>(EvaluationService);

    screening = new ScreeningEntity();
    screening.payload = {
      foo: true,
      bar: 5,
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('evaluate', () => {
    it('should evaluate correctly', () => {
      const instrument = new InstrumentEntity();
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

      const result = service.evaluate(screening, instrument);
      expect(result).toHaveLength(2);
      expect(result[0]).toMatchObject({ result: true });
      expect(result[1]).toMatchObject({ result: false });
    });

    it('should not evaluate correctly', () => {
      const instrument = new InstrumentEntity();
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

      const result = service.evaluate(screening, instrument);
      expect(result).toHaveLength(2);
      expect(result[0]).toMatchObject({ result: null });
      expect(result[1]).toMatchObject({ result: null });
    });
  });

  describe('evaluateRule', () => {
    it('should evaluate correctly', () => {
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
      console.log = jest.fn();
      const invalidSyntax = 'foo == "true';
      let result = service.evaluateRule(
        invalidSyntax,
        screening.getScreeningData(),
      );
      expect(result).toBeUndefined();
      const nonExistantParameter = 'x > 5';
      result = service.evaluateRule(
        nonExistantParameter,
        screening.getScreeningData(),
      );
      expect(result).toBeUndefined();
    });
  });
});
