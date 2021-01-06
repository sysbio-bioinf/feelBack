import { ScreeningObject } from '@feelback-app/api/interfaces';

export async function generateScreeningObject(
  overwriteData: any,
): Promise<ScreeningObject> {
  return Promise.resolve({ ...emptyScreeningObject, ...overwriteData });
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
