import { CoreClass } from '@cancerlog/api/core';

export class UserAgentClass extends CoreClass {
  device?: string;
  os?: string;
  application?: string;
}
