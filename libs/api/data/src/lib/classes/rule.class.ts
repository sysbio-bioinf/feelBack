import { CoreClass } from '@cancerlog/api/core';

export class RuleClass extends CoreClass {
  name: string;
  condition: string;

  then: string;
  else: string;
}
