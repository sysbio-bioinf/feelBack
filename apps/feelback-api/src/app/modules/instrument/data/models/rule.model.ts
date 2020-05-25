import { CoreModel } from '@cancerlog/api/core';

export interface RuleModel extends CoreModel {
  name: string;
  condition: string;

  then: string;
  else: string;
}
