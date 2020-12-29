import { PersonEntity } from '@feelback-app/api/data';

export const inactivePerson: PersonEntity = {
  pseudonym: 'inactivePerson',
  isActive: false,
  acceptedTOS: true,
  acceptedTOSAt: new Date(),
  screenings: [],
  version: 2,
  id: 'inactivePerson1',
  _screenings: [],
  organizations: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const activePerson: PersonEntity = {
  pseudonym: 'activePerson',
  isActive: true,
  acceptedTOS: true,
  acceptedTOSAt: new Date(),
  screenings: [],
  version: 1,
  id: 'activePerson1',
  _screenings: [],
  organizations: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};
