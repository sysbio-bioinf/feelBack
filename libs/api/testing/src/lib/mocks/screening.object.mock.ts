import { ScreeningObject } from '@feelback-app/api/interfaces';

export function generateScreeningObject(overwriteData: any): ScreeningObject {
  return { ...emptyScreeningObject, ...overwriteData };
}

export const emptyScreeningObject: ScreeningObject = {
  id: 'emptyId',
  instanceId: 'instanceId',
  version: 1,
  language: 'de',
  payload: {},
  isResolved: true,
  resolveComment: 'resolved in test',
  collectedAt: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
  resolvedAt: new Date(),
};
