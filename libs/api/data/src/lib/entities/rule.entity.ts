import { CoreEntity } from '@cancerlog/api/core';

export class RuleEntity extends CoreEntity {
  name: string;
  condition: string;

  then: string;
  else: string;
}
