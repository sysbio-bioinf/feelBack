import { InstrumentEntity, ScreeningEntity } from '@cancerlog/api/data';
import { Test, TestingModule } from '@nestjs/testing';
import { EvaluationService } from './evaluation.service';

describe('EvaluationService', () => {
  let service: EvaluationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EvaluationService],
    }).compile();

    service = module.get<EvaluationService>(EvaluationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an empty result with null params', () => {
    expect(service.evaluate(null, null)).toMatchObject([]);
    expect(service.evaluate(null, new InstrumentEntity())).toMatchObject([]);
    expect(service.evaluate(new ScreeningEntity(), null)).toMatchObject([]);
  });

  it('should evaluate correctly', () => {
    const screening = new ScreeningEntity();
    screening.payload = {
      foo: true,
      bar: 5,
    };

    const instrument = new InstrumentEntity();
    instrument.rules = [
      {
        name: 'rule1',
        expression: 'foo == true',
        headline: 'foo',
        text: 'a',
      },
      {
        name: 'rule2',
        expression: 'bar < 3',
        headline: 'bar',
        text: 'b',
      },
    ];

    const result = service.evaluate(screening, instrument);
    expect(result).toHaveLength(2);
    expect(result[0]).toMatchObject({ result: true });
    expect(result[1]).toMatchObject({ result: false });
  });

  it('should not evaluate correctly', () => {
    const screening = new ScreeningEntity();
    screening.payload = {
      foo: true,
      bar: 5,
    };

    const instrument = new InstrumentEntity();
    instrument.rules = [
      {
        name: 'rule1',
        expression: 'x == "foobar',
        headline: 'foo',
        text: 'a',
      },
      {
        name: 'rule2',
        expression: 'y >= 100',
        headline: 'bar',
        text: 'b',
      },
    ];

    const result = service.evaluate(screening, instrument);
    expect(result).toHaveLength(2);
    expect(result[0]).toMatchObject({ result: null });
    expect(result[1]).toMatchObject({ result: null });
  });
});
