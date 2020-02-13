import { CoreModel } from '@cancerlog/api/core';

export interface UserAgentModel extends CoreModel {
  device?: string;
  os?: string;
  application?: string;
}
