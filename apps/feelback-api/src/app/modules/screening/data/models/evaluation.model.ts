import { RuleModel } from '../../../instrument/data/models/rule.model';

export interface EvaluationModel extends RuleModel {
  result?: boolean;
}
