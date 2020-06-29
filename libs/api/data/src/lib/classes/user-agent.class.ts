import { CoreClass } from '@feelback-app/api/core';

export class UserAgentClass extends CoreClass {
  device?: string;
  os?: string;
  application?: string;
}
