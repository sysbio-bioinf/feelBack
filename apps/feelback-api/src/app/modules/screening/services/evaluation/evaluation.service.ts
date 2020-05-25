import { CoreService } from '@cancerlog/api/core';
import { Injectable } from '@nestjs/common';
import * as deepmerge from 'deepmerge';
import * as expreval from 'expr-eval';
import { InstrumentEntity } from '../../../instrument/data/entities/instrument.entity';
import { ScreeningEntity } from '../../data/entities/screening.entity';
import { EvaluationModel } from '../../data/models/evaluation.model';

@Injectable()
export class EvaluationService extends CoreService {
  constructor() {
    super();
  }

  evaluate(
    screening: ScreeningEntity,
    instrument: InstrumentEntity,
  ): EvaluationModel[] {
    const evaluationResults: EvaluationModel[] = [];

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

        const result = deepmerge<EvaluationModel>(rule, {
          result: expressionResult,
        });
        evaluationResults.push(result);
      } catch (exception) {
        const result = deepmerge<EvaluationModel>(rule, {
          result: null,
        });
        evaluationResults.push(result);
      }
    }

    return evaluationResults;
  }
}
