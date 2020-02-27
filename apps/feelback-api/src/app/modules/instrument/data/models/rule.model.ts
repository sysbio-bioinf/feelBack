import { CoreModel } from '@cancerlog/api/core';

export interface RuleModel extends CoreModel {
  name: string;
  expression: string;

  headline: string;
  text: string;
}
