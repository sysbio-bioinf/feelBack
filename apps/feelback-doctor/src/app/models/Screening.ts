import { EvaluationResult } from './EvaluationResult';

export class Screening {
  locale: string;
  instrument: string;
  date: Date;
  payload: {};
  comment: string;
  evaluationResult: EvaluationResult[]
}
