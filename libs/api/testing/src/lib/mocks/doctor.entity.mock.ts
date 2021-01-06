import { DoctorEntity } from '@feelback-app/api/data';

export const mockDoctorEntity: DoctorEntity = {
  keycloakId: 'valid',
  id: 'docId',
  isActive: true,
  title: '',
  firstname: 'first',
  lastname: 'name',
  lastLoginAt: new Date(),
  phone: '12345',
  email: 'test@uni-ulm.de',
  url: 'url',
  picture: '',
  acceptedTOS: true,
  settings: {},
  organizations: [],
  version: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};
