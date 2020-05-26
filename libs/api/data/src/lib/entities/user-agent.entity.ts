import { CoreEntity } from '@cancerlog/api/core';

export class UserAgentEntity extends CoreEntity {
  device?: string;
  os?: string;
  application?: string;
}
