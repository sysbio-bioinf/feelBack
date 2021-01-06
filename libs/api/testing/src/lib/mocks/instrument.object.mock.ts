import { InstrumentStatesEnum } from '@feelback-app/api/data';
import { InstrumentObject } from '@feelback-app/api/interfaces';

export async function generateInstrumentObject(
  overwriteData: any,
): Promise<InstrumentObject> {
  return Promise.resolve({ ...emptyInstrumentObject, ...overwriteData });
}

export const emptyInstrumentObject: InstrumentObject = {
  name: 'emptyName',
  description: 'description',
  type: 'type',
  image: 'image',
  payload: {},
  rules: [],
  diagram: {},
  changelog: 'changelog',
  id: 'emptyId',
  state: InstrumentStatesEnum.DRAFT,
  version: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};
