import { ScreeningEntity } from '@feelback-app/api/data';

export function generateScreeningEntity(overwriteData: any): ScreeningEntity {
  return { ...emptyScreeningEntity, ...overwriteData };
}

export const emptyScreeningEntity: ScreeningEntity = {
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
  person: null,
  userAgent: null,
  instrument: null,
  _instrumentId: '',
  _personId: '',
  getScreeningData: () => ({}),
};
