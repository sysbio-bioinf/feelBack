import { InstrumentEntity, InstrumentStatesEnum } from '@feelback-app/api/data';

export function generateInstrumentEntity(overwriteData: any): InstrumentEntity {
  return { ...emptyInstrumentEntity, ...overwriteData };
}

export const emptyInstrumentEntity: InstrumentEntity = {
  name: 'emptyName',
  description: 'description',
  type: 'type',
  image: 'image',
  payload: {},
  rules: [],
  diagram: {
    collection: {},
    instance: {},
  },
  changelog: 'changelog',
  id: 'emptyId',
  state: InstrumentStatesEnum.DRAFT,
  version: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  screenings: [],
  _screenings: [],
};
