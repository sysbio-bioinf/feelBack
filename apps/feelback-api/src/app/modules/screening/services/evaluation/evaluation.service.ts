import { CoreService } from '@cancerlog/api/core';
import {
  EvaluationEntity,
  InstrumentEntity,
  ScreeningEntity,
} from '@cancerlog/api/data';
import { Injectable } from '@nestjs/common';
import * as deepmerge from 'deepmerge';
import * as expreval from 'expr-eval';

@Injectable()
export class EvaluationService extends CoreService {
  constructor() {
    super();
  }

  evaluate(
    screening: ScreeningEntity,
    instrument: InstrumentEntity,
  ): EvaluationEntity[] {
    const evaluationResults: EvaluationEntity[] = [];

    if (!screening) {
      return evaluationResults;
    }
    if (!instrument) {
      return evaluationResults;
    }

    const data = screening.getScreeningData();
    const evaluationParser = new expreval.Parser();
    const rules = instrument.rules;

    for (const rule of rules) {
      try {
        const normalExpression = rule.condition;
        const parsedExpression = evaluationParser.parse(normalExpression);
        const expressionResult = parsedExpression.evaluate(data as any);

        const result = deepmerge<EvaluationEntity>(rule, {
          result: expressionResult,
        });
        evaluationResults.push(result);
      } catch (exception) {
        const result = deepmerge<EvaluationEntity>(rule, {
          result: null,
        });
        evaluationResults.push(result);
      }
    }

    return evaluationResults;
  }
}
