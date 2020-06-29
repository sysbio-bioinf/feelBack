import { CoreClass } from '@feelback-app/api/core';

export class RuleClass extends CoreClass {
  name!: string;
  condition!: string;

  then!: string;
  else!: string;
}
